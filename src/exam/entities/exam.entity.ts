import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {HftmModulePart} from "../../hftm-module-part/entities/hftm-module-part.entity";

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weighting: string;

  @ManyToOne(() => HftmModulePart, (modulpart) => modulpart.exams)
  @JoinColumn({ name: 'module_part_id'})
  modulpart: HftmModulePart;
}
