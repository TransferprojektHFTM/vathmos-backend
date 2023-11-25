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
import { StudentClass } from '../../student-class/entities/student-class.entity';
import { Degree } from '../../degree/entities/degree.entity';

@Entity()
export class Cohort {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.cohort)
  studentClasses: StudentClass[];

  @ManyToOne(() => Degree)
  @JoinColumn({ name: 'degree_id' })
  degree: Degree;

  @Column()
  startYear: Date;
}
