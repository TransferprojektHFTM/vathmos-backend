import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {HftmModule} from "../../hftm-module/entities/hftm-module.entity";
import {Course} from "../../course/entities/course.entity";

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(()=> Course, (course) => course.curriculum)
  courses: Course[];


  @ManyToMany(() => HftmModule)
  @JoinTable( {name: 'module_curriculum',
    joinColumn: {name: 'curriculum_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'module_id', referencedColumnName: 'id'}})
  hftmModule: HftmModule[];

}
