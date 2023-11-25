import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ModuleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, type: 'varchar' })
  name: string;
}
