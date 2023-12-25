import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cohort } from '../../cohort/entities/cohort.entity';
import { CoreModule } from '../../core-module/entities/core-module.entity';
import { Person } from '../../person/entities/person.entity';

export enum Model {
  'TZ' = 'TZ',
  'VZ' = 'VZ',
}

@Entity()
export class DegreeProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  name: string;

  @Column({ type: 'enum', enum: Model })
  model: string;

  @Column({ type: 'json' })
  specialisation: string;

  @OneToMany(() => Cohort, (cohort) => cohort.degreeProgram)
  cohorts: Cohort[];

  @ManyToMany(() => CoreModule)
  @JoinTable({
    name: 'module_degree_program',
    joinColumn: { name: 'degree_program_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'module_id', referencedColumnName: 'id' },
  })
  coreModules: CoreModule[];

  @ManyToOne(() => Person)
  @JoinColumn({
    name: 'person_in_charge_id',
    foreignKeyConstraintName: 'id',
  })
  personInCharge: Person;
}
