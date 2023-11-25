import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Cohort } from '../../cohort/entities/cohort.entity';

@Entity()
export class StudentClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'uuid', unique: true })
  oid: string;

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'student_class_person',
    joinColumn: { name: 'student_class_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  persons: Person[];

  @ManyToOne(() => Cohort, (cohort) => cohort.studentClasses)
  @JoinColumn({ name: 'cohort_id' })
  cohort: Cohort;
}
