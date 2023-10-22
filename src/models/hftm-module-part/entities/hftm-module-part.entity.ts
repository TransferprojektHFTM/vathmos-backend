import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'module_part_person',
    joinColumn: { name: 'module_part_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'lecturer_id', referencedColumnName: 'id' },
  })
  lecturer: Person[];

  @ManyToMany(() => HftmModule)
  @JoinTable({
    name: 'module_part_module',
    joinColumn: { name: 'module_part_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'module_id', referencedColumnName: 'id' },
  })
  hftModule: HftmModule[];

  @OneToMany(() => Exam, (exams) => exams.id)
  exams: Exam[];
}
