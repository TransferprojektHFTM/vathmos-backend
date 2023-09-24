import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Modul
  // @Column()
  // @ManyToOne(() => Curriculum, (curriculum) => curriculum.id)
}
