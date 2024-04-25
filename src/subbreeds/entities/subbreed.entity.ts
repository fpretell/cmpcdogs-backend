import { Breed } from 'src/breeds/entities/breed.entity';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subbreed {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column({
        type: 'text',    
        nullable: true
    })
    description: string;

    @OneToMany(type => Dog, dog => dog.subbreed)
    dogs: Dog[];

    @ManyToOne(type => Breed, breed => breed.subbreeds)
    breed: Breed;

}