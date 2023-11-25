import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentClass } from '../../student-class/entities/student-class.entity';
import { DegreeProgram } from '../../degree-program/entities/degree-program.entity';

@Entity()
export class Cohort {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.cohort)
  studentClasses: StudentClass[];

  @ManyToOne(() => DegreeProgram, { nullable: false })
  @JoinColumn({ name: 'degree_program_id' })
  degreeProgram: DegreeProgram;

  @Column()
  @Index()
  startYear: Date;
}
