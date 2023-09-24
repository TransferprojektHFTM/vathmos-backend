import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HftmClass } from '../../hftm-class/entities/hftm-class.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @OneToMany(() => HftmClass, (hftmClass) => hftmClass.id)
  hftmClass: number;

  @Column()
  startYear: Date;
}
