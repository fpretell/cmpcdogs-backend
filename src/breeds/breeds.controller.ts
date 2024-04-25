import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get('subbreeds/:id')
  findOne(@Param('id') id: number) {
    return this.breedsService.getSubbreedsByBreedId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }
}
