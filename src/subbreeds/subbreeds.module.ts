import { Module } from '@nestjs/common';
import { SubbreedsService } from './subbreeds.service';
import { SubbreedsController } from './subbreeds.controller';
import { Subbreed } from './entities/subbreed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Module({
  controllers: [SubbreedsController],
  providers: [SubbreedsService],
  imports: [TypeOrmModule.forFeature([Subbreed, Breed])]
})
export class SubbreedsModule {}
