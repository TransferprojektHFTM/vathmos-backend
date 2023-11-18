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
import { HftmClass } from '../../student-class/entities/student-class.entity';
import { Degree } from '../../degree/entities/degree.entity';

@Entity()
export class Cohort {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => HftmClass, (studentClass) => studentClass.cohorts)
  studentClass: HftmClass[];

  @ManyToOne(() => Degree)
  @JoinColumn({ name: 'degree_id' })
  degree: Degree;

  @Column()
  startYear: Date;
}
