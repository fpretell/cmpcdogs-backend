import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
    IsPositive, IsString, MinLength 
} from 'class-validator';

export class CreateDogDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsIn(['male','female'])
    gender: string;

    @IsNumber()
    breedId?: number;

    @IsNumber()
    subbreedId?: number;

}
