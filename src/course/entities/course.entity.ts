import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { HftmClass } from '../../hftm-class/entities/hftm-class.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => HftmClass, (hftmClass) => hftmClass.courses)
  hftmClass: HftmClass[];

  @Column()
  startYear: Date;
}
