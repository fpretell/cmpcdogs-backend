import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BreedsController],
  providers: [BreedsService],
  imports: [TypeOrmModule.forFeature([Breed])]
})
export class BreedsModule {}
