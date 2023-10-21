import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ModulTyp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 10, type: 'varchar'})
    name: string;

}
