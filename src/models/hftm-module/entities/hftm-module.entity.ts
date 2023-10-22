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
import { ModulTyp } from '../../modul-typ/entities/modul-typ.entity';

@Entity()
export class HftmModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => ModulTyp)
  @JoinColumn({ name: 'modul_typ_id' })
  moduleType: number;
}
