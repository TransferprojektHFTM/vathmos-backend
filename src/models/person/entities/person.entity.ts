import {
  Column,
  Entity,
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

  @Column({ default: 'Student' })
  roles: string;

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
