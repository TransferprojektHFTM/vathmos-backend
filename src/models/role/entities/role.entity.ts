import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  appRoleId: string;

  @Column()
  name: string;
}
