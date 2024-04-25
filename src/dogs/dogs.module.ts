import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [TypeOrmModule.forFeature([Dog, Breed, Subbreed])]
})
export class DogsModule {}
