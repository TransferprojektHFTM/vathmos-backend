import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HftmModule } from '../../hftm-module/entities/hftm-module.entity';
import { Person } from '../../person/entities/person.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
export class HftmModulePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @ManyToMany(() => Person, (person) => person.id)
  lecturer: number;

  @Column()
  @ManyToMany(() => HftmModule, (hftmModule) => hftmModule.id)
  hftModule: number;

  @Column()
  @OneToMany(() => Exam, (exams) => exams.id)
  exams?: number;
}
