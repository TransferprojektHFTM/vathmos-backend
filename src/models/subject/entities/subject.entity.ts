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

  @Column()
  name: string;

  @Column()
  shortName: string;

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'subject_person',
    joinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'lecturer_id', referencedColumnName: 'id' },
  })
  lecturer: Person[];

  @ManyToMany(() => CoreModule)
  @JoinTable({
    name: 'subject_module',
    joinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'module_id', referencedColumnName: 'id' },
  })
  hftModule: CoreModule[];

  @OneToMany(() => Exam, (exams) => exams.id)
  exams: Exam[];
}
