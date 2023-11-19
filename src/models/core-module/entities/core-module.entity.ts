import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => ModuleType)
  @JoinColumn({ name: 'module_type_id' })
  moduleType: ModuleType;
}
