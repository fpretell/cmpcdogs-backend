import { Dog } from 'src/dogs/entities/dog.entity';
import { Subbreed } from 'src/subbreeds/entities/subbreed.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breed {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column({
        type: 'text',    
        nullable: true
    })
    description: string;

    @OneToMany(type => Dog, dog => dog.breed)
    dogs: Dog[];


    @OneToMany(type => Subbreed, subbreed => subbreed.breed)
    subbreeds: Subbreed[];
}