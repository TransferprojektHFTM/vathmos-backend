import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1' })
  id: number;

  @Column({ type: 'uuid', unique: true , default: null})
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  appRoleId: string;

  @Column()
  @ApiProperty({ example: 'Student' })
  name: string;
}
