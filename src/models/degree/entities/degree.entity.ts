import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cohort } from '../../cohort/entities/cohort.entity';
import { CoreModule } from '../../core-module/entities/core-module.entity';

export enum Model {
  'TZ' = 'TZ',
  'VZ' = 'VZ',
}

@Entity()
export class Degree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Model })
  model: string;

  @Column()
  specialisation: string;

  @OneToMany(() => Cohort, (cohort) => cohort.degree)
  cohorts: Cohort[];

  @ManyToMany(() => CoreModule)
  @JoinTable({
    name: 'module_degree',
    joinColumn: { name: 'degree_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'module_id', referencedColumnName: 'id' },
  })
  coreModule: CoreModule[];
}
