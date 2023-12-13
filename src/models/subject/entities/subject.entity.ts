import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoreModule } from '../../core-module/entities/core-module.entity';
import { Person } from '../../person/entities/person.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  shortName: string;

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'subject_person',
    joinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'lecturer_id', referencedColumnName: 'id' },
  })
  lecturers: Person[];

  @ManyToMany(() => CoreModule)
  @JoinTable({
    name: 'subject_module',
    joinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'module_id', referencedColumnName: 'id' },
  })
  coreModules: CoreModule[];

  @OneToMany(() => Exam, (exams) => exams.id)
  exams: Exam[];
}
