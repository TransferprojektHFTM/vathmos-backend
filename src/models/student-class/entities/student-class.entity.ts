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
import { Cohort } from '../../cohort/entities/cohort.entity';

@Entity()
export class HftmClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'student_class_person',
    joinColumn: { name: 'student_class_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  person: Person[];

  @ManyToOne(() => Cohort, (cohort) => cohort.studentClass)
  @JoinColumn({ name: 'cohort_id' })
  cohorts: Cohort;
}
