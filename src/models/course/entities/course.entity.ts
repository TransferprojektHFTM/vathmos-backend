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
import { HftmClass } from '../../hftm-class/entities/hftm-class.entity';
import { ModulePlan } from '../../module-plan/entities/module-plan.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => HftmClass, (hftmClass) => hftmClass.courses)
  hftmClass: HftmClass[];

  @ManyToOne(() => ModulePlan)
  @JoinColumn({ name: 'moduleplan_id' })
  modulePlan: ModulePlan;

  @Column()
  startYear: Date;
}
