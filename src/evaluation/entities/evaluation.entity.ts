import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  val: number;

  @Column()
  @ManyToOne(() => Exam, (exam) => exam.id)
  exam: number;

  @Column()
  @OneToOne(() => Person, (person) => person.id)
  student: number;
}
