import { Controller, Get, Post, Body, UploadedFile, Param, Delete, UseInterceptors, Query } from '@nestjs/common';

import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entities/dog.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  async createSubraza(
    @Body('breedId') breedId: number,
    @Body('subbreedId') subbreedId: number,
    @Body() createDogDto: CreateDogDto
  ): Promise<Dog> {
    return this.dogsService.create(breedId, subbreedId, createDogDto);
  }

  @Get()
  findAll() {
    // return this.dogsService.findAll();
    return this.dogsService.obtenerPerrosConRaza();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dogsService.remove(id);
  }


  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async uploadFile(@Param('id') name: string, @UploadedFile() file) {
    // rename
    const newPath = './uploads/' + name + extname(file.filename);
    createReadStream(file.path)
      .pipe(createWriteStream(newPath))
      .on('finish', () => {
        unlinkSync(file.path);
      });
    const newNameToSend = newPath.replace('./uploads/', "");

    // take id from name
    const newId = name.split("--")
    const lastElem = newId[newId.length - 1];
    this.dogsService.actualizarImagen(parseInt(lastElem), newNameToSend)
  }

  @Get('bybreeds')
  async getDogsByBreeds(@Query('breeds') breeds: string): Promise<Dog[]> {
    const breedsArray = breeds.split(',');
    return await this.dogsService.getDogsByBreed(breedsArray);
  }

  @Get('bysubbreeds')
  async getDogsBySubbreeds(@Query('subbreeds') subbreeds: string): Promise<Dog[]> {
    const breedsArray = subbreeds.split(',');
    return await this.dogsService.getDogsBySubbreed(breedsArray);
  }

}
