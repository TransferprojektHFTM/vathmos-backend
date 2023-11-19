import { Role } from 'src/models/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'uuid', unique: true })
  oid: string;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  surname: string;

  @Column({ default: null })
  email: string;

  @Column({ type: 'longtext', default: null })
  picture: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'person_role',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @Column({ default: false })
  isActivated: boolean;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  lastLogin: Date;
}
