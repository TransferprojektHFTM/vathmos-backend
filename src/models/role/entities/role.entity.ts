import { Person } from 'src/models/person/entities/person.entity';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  appRoleId: string;

  @Column()
  name: string;

  @ManyToMany(() => Person)
  @JoinTable({
    name: 'person_role',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  persons: Person[];

}
