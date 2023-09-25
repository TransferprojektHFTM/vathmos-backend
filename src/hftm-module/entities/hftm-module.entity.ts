import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Curriculum} from "../../curriculum/entities/curriculum.entity";

@Entity()
export class HftmModule {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  moduleType: string;

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.id)
  curriculum: number;

  // fehlt noch many to many curriculum to hftm-module jointable
  // https://blog.continium-labs.com/many-to-many-relations-with-typeorm-and-nestjs/
  // @Column()
  // @ManyToMany(() => HftmModule, (hftmModule) => hftmModule.id)
}
