import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {AppCustomLogger} from "../../app.custom.logger";
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "../person/entities/person.entity";
import {Like, Repository} from "typeorm";
import {Role} from "./entities/role.entity";

@Injectable()
export class RoleService {
    private readonly logger = new AppCustomLogger(RoleService.name);

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {
    }

    create(createRoleDto: CreateRoleDto) {
        return this.roleRepository.save(createRoleDto);
    }

    findAll(roleName: string = ''): Promise<Role[] | Role> {
        if (roleName.length < 2) return this.roleRepository.find();
        return this.roleRepository.find({
            where: { name: Like(`%${roleName}%`) },
        });
    }

    findOne(id: number) {
        return this.roleRepository.findOne({where: {id: id}});
    }

    findByName(name: string) {
        return this.roleRepository.findOne({where: {name: name}});
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
      return this.roleRepository.update(id, updateRoleDto);
    }

    async remove(id: number): Promise<{ message: string; status: number }> {
        const deleteResult = await this.roleRepository.delete(id);
        if (deleteResult.affected === 1) {
            this.logger.log(`Person with id ${id} deleted`);
            return {message: `Person with id ${id} deleted`, status: 200};
        } else {
            throw new NotFoundException(`Person with id ${id} not found`);
        }
    }
}
