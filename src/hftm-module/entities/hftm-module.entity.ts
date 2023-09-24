import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HftmModule {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  moduleType: string;

  // fehlt noch many to many curriculum to hftm-module jointable
  // https://blog.continium-labs.com/many-to-many-relations-with-typeorm-and-nestjs/
  // @Column()
  // @ManyToMany(() => HftmModule, (hftmModule) => hftmModule.id)
}
