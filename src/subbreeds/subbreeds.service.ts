import { CreateSubbreedDto } from './dto/create-subbreed.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subbreed } from './entities/subbreed.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class SubbreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(Subbreed)
    private readonly subbreedRepository: Repository<Subbreed>,
  ) {}

  async create(breedId: number, createSubbreedDto: CreateSubbreedDto): Promise<Subbreed> {
    try {
      const breed = await this.breedRepository.findOneBy({ id: breedId });
      if (!breed) {
        throw new NotFoundException(`No se encontró la raza con el ID ${breedId}`);
      }
      const subbread = this.subbreedRepository.create({
        ...createSubbreedDto,
        breed,
      });
      await this.subbreedRepository.save( subbread );
      return subbread;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.subbreedRepository.find()
  }

  async getSubbreedWithBreed(): Promise<Subbreed[]> {
    return this.subbreedRepository
      .createQueryBuilder('subbreed')
      .leftJoinAndSelect('subbreed.breed', 'breed')
      .getMany();
  }

  async remove(id: number) {
    const subbreed = await this.subbreedRepository.findOneBy({ id: id });
    await this.subbreedRepository.remove( subbreed );
    return {
      id,
      delete: true,
      count: 1
    };
  }

  async getSubbreedsByBreeds(breeds: string[]): Promise<Subbreed[]> {
    return await this.subbreedRepository.createQueryBuilder('subbreed')
      .where('subbreed.breed IN (:...breeds)', { breeds })
      .getMany();
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}

