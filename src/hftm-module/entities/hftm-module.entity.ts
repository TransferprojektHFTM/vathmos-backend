import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Curriculum } from '../../curriculum/entities/curriculum.entity';

@Entity()
export class HftmModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  moduleType: string;

  @Column()
  @ManyToMany(() => Curriculum, (curriculum) => curriculum.id)
  curriculum: number;
}
