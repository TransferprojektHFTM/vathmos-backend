import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class HftmClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'personId' })
  @ManyToMany(() => Person, (personEntity) => personEntity.id)
  person: number;
}
