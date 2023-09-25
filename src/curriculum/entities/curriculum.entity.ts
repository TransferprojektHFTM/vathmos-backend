import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {HftmModule} from "../../hftm-module/entities/hftm-module.entity";

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
