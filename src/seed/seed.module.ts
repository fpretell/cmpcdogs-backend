import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule.forFeature([Dog, Breed, Subbreed])]
})
export class SeedModule {}
