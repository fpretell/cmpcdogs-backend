import { CreateDogDto } from './dto/create-dog.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';

@Injectable()
export class DogsService {

  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(Subbreed)
    private readonly subbreedRepository: Repository<Subbreed>,
  ) {}

  async create(breedId: number, subbreedId: number, createDogDto: CreateDogDto): Promise<Dog> {
    try {
      const breed = await this.breedRepository.findOneBy({ id: breedId });
      if (!breed) {
        throw new NotFoundException(`No se encontró la raza con el ID ${breedId}`);
      }

      const subbreed = await this.subbreedRepository.findOneBy({ id: subbreedId });
      if (!subbreed) {
        throw new NotFoundException(`No se encontró la subraza con el ID ${breedId}`);
      }

      const dog = this.dogRepository.create({
        ...createDogDto,
        breed,
        subbreed
      });
      await this.dogRepository.save(dog);
      return dog;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.dogRepository.find()
  }
  
  async remove(id: number) {
    const dog = await this.dogRepository.findOneBy( { id: id } );
    await this.dogRepository.remove( dog );
    return {
      id,
      delete: true,
      count: 1
    };
    
  }

  async actualizarImagen(id: number, imagen: string): Promise<Dog> {
    try {
      const dog = await this.dogRepository.findOneBy({ id });
      if (!dog) {
        return null;
      }
      dog.image = imagen;
      const dogUpdated = await this.dogRepository.save(dog);
      return dogUpdated;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async obtenerPerrosConRaza(): Promise<Dog[]> {
    return this.dogRepository
      .createQueryBuilder('dog')
      .leftJoinAndSelect('dog.breed', 'breed')
      .leftJoinAndSelect('dog.subbreed', 'subbreed')
      .getMany();
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    // this.logger.error(error)
    console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async getDogsByBreed(breeds: string[]): Promise<Dog[]> {
    return await this.dogRepository.createQueryBuilder('dog')
      .where('dog.breed IN (:...breeds)', { breeds })
      .leftJoinAndSelect('dog.breed', 'breed')
      .leftJoinAndSelect('dog.subbreed', 'subbreed')
      .getMany();
  }

  async getDogsBySubbreed(subbreeds: string[]): Promise<Dog[]> {
    return await this.dogRepository.createQueryBuilder('dog')
      .where('dog.subbreed IN (:...subbreeds)', { subbreeds })
      .leftJoinAndSelect('dog.breed', 'breed')
      .leftJoinAndSelect('dog.subbreed', 'subbreed')
      .getMany();
  }

}

