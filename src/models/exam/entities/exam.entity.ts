import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weighting: string;

  @ManyToOne(() => Subject, (modulpart) => modulpart.exams)
  @JoinColumn({ name: 'subject_id' })
  // @Column()
  modulpart: Subject;
}
