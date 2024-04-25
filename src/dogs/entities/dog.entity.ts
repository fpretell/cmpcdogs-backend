import { Breed } from 'src/breeds/entities/breed.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('float',{
        default: 0
    })
    price: number;

    @Column({
        type: 'text',    
        nullable: true
    })
    description: string;

    @Column({
        type: 'text',    
        nullable: true
    })
    image: string;

    @Column('text')
    gender: string;

    @ManyToOne(type => Breed, breed => breed.dogs)
    breed: Breed;

    @ManyToOne(type => Subbreed, subbreed => subbreed.dogs)
    subbreed: Subbreed;

}