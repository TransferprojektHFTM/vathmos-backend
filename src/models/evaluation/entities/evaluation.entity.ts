import {
  Column,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'exam_id' })
  exam: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'student_id' })
  student: number;
}
