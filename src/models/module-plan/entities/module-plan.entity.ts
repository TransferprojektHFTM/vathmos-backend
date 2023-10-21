import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { HftmModule } from '../../hftm-module/entities/hftm-module.entity';

export enum Model {
  'TZ' = 'TZ',
  'VZ' = 'VZ',
}

@Entity()
export class ModulePlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Model })
  model: string;

  @Column()
  specialisation: string;

  @OneToMany(() => Course, (course) => course.modulePlan)
  courses: Course[];

  @ManyToMany(() => HftmModule)
  @JoinTable({
    name: 'module_module_plan',
    joinColumn: { name: 'module_plan_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'module_id', referencedColumnName: 'id' },
  })
  hftmModule: HftmModule[];
}
