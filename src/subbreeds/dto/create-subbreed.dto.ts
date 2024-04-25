import { IsNumber, IsOptional, IsString, MinLength 
} from 'class-validator';

export class CreateSubbreedDto {

    @IsString()
    @MinLength(1)
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    breedId?: number;
}
