import {
  Column,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Role} from "../../role/entities/role.entity";
import {StudentClass} from "../../student-class/entities/student-class.entity";

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

  @Column({ default: false })
  isActivated: boolean;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'person_role',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @ManyToMany(() => StudentClass, classes => classes.persons)
  classes: StudentClass[]

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  lastLogin: Date;
}
