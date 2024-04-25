import { CreateBreedDto } from './dto/create-breed.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    try {
      const breed = this.breedRepository.create(createBreedDto);
      await this.breedRepository.save( breed );
      return breed;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.breedRepository.find()
  }

  async getSubbreedsByBreedId(razaId: number): Promise<Subbreed[]> {
    const raza = await this.breedRepository.findOne({
      where: { id: razaId },
      relations: ['subbreeds']
    });
    return raza.subbreeds;
  }

  async remove(id: number) {
    const breed:Breed = await this.breedRepository.findOneBy({ id: id });
    await this.breedRepository.remove( breed );
    return {
      id,
      delete: true,
      count: 1
    };
    
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // this.logger.error(error)
    console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}

