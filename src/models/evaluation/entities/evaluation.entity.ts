import {
  Column,
  Entity, Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
@Index("evaluation_exam_student", ["student.id", "exam.id"], { unique: true })
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  val: number;

  @ManyToOne(() => Exam, (exam) => exam.id, {
    nullable: false , cascade:false
  })
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @ManyToOne(() => Person, {
    nullable: false, cascade:false
  })
  @JoinColumn({ name: 'student_id' })
  student: Person;
}
