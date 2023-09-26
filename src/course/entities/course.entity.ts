import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { HftmClass } from '../../hftm-class/entities/hftm-class.entity';
import {Curriculum} from "../../curriculum/entities/curriculum.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => HftmClass, (hftmClass) => hftmClass.courses)
  hftmClass: HftmClass[];

  @ManyToOne(()=> Curriculum)
  @JoinColumn({name: 'curriculum_id'})
  curriculum: Curriculum;

  @Column()
  startYear: Date;
}
