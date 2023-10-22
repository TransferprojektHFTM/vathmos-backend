import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Course } from '../../course/entities/course.entity';

@Entity()
export class HftmClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'hftm_class_person',
    joinColumn: { name: 'hftm_class_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  person: Person[];

  @ManyToOne(() => Course, (course) => course.hftmClass)
  @JoinColumn({ name: 'course_id' })
  courses: Course;
}
