import { Injectable } from '@nestjs/common';
import { BREEDSDOGS, DOGSNAMES, GENDER } from './constants/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(Subbreed)
    private readonly subbreedRepository: Repository<Subbreed>,
  ) {}

  async executeSeed() {

    let count:number = 0
    for (const raza of BREEDSDOGS) {

      /** insert breed */
      const breed = this.breedRepository.create({ name: raza.name, description: raza.name })
      await this.breedRepository.save( breed );
      raza.subbreeds.map(async el => {

        /** insert subbreed */
        const objSubBreed = {
          name: el,
          description: el,
          breed
        }
        const subbreed = this.subbreedRepository.create(objSubBreed)
        await this.subbreedRepository.save( subbreed );

        /** insert dog */
        const objDog = {
          name: DOGSNAMES[Math.floor(Math.random() * 40)],
          price: 100000,
          description: breed.name + ' - ' + subbreed.name,
          image: 'image' + count + '.jpg',
          gender: GENDER[Math.round(Math.random())]
        }
        count++;
        if (count === 10)
          count = 0
        const dog = this.dogRepository.create({
          ...objDog,
          breed,
          subbreed
        });
        await this.dogRepository.save(dog);
        
      })
    }
  }
}