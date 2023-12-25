import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  val: number;

  @ManyToOne(() => Exam, (exam) => exam.id, { nullable: false })
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @ManyToOne(() => Person, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: Person;
}
