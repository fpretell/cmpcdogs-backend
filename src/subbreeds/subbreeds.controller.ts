import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubbreedsService } from './subbreeds.service';
import { CreateSubbreedDto } from './dto/create-subbreed.dto';
import { Subbreed } from './entities/subbreed.entity';

@Controller('subbreeds')
export class SubbreedsController {
  constructor(private readonly subbreedsService: SubbreedsService) {}

  @Post()
  async createSubbreed(@Body('breedId') breedId: number, @Body() createSubbreedDto: CreateSubbreedDto): Promise<Subbreed> {
    return this.subbreedsService.create(breedId, createSubbreedDto);
  }

  @Get()
  findAll() {
    return this.subbreedsService.getSubbreedWithBreed();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subbreedsService.remove(id);
  }

  @Get('bybreeds')
  async getDogsByBreeds(@Query('breeds') breeds: string): Promise<Subbreed[]> {
    const breedsArray = breeds.split(',');
    return await this.subbreedsService.getSubbreedsByBreeds(breedsArray);
  }
}
