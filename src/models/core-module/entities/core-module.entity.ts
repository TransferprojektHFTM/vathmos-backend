import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleType } from '../../module-type/entities/module-type.entity';

@Entity()
export class CoreModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => ModuleType)
  @JoinColumn({ name: 'module_type_id' })
  moduleType: number;
}
