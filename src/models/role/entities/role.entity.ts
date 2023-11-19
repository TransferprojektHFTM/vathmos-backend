import { Person } from 'src/models/person/entities/person.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  oid: string;

  @Column()
  name: string;

  @ManyToMany(() => Person, (person) => person.roles)
  persons: Person[];
}
