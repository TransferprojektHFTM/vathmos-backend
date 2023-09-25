import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import {Course} from "../../course/entities/course.entity";

@Entity()
export class HftmClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Person, (personEntity) => personEntity.id)
  person: number;

  @ManyToOne(() => Course, (course) => course.hftmClass)
  courses: Course;
}
