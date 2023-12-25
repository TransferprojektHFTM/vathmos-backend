import {Injectable, OnModuleInit} from '@nestjs/common';
import {AppCustomLogger} from "../../app.custom.logger";
import {Cron, CronExpression } from "@nestjs/schedule";
import {PersonService} from "../../models/person/person.service";
import {StudentClassService} from "../../models/student-class/student-class.service";

@Injectable()
export class TaskService implements OnModuleInit{
    private readonly logger = new AppCustomLogger(TaskService.name);

    constructor(private personService: PersonService,
                private studentClassService: StudentClassService) {
    }

    @Cron('0 */5 * * * *')
    async handleCron() {
        this.logger.debug('Called when the current second is 45');

    }

    @Cron(CronExpression.EVERY_DAY_AT_2AM, {
        name: 'person service',
        timeZone: 'Europe/Zurich'
    })
    async createPersons() {
        this.logger.debug('Create Persons and Classes')
        await this.personService.createPersons();
        await this.studentClassService.createClasses();
        await this.studentClassService.appRolesAzureAssignments();
        await this.studentClassService.assignClassesToPersons();
        await this.personService.getAllUserPicturesAndSave()
    }

    /**
     * This method is called when the application starts
     * @TODO Remove this method on Init when the application is ready
     */
    async onModuleInit() {
        const persons = await this.personService.findAll();
        if(persons.length === 0) {
            this.logger.debug('Create Persons and Classes over task service on init')
            await this.personService.createPersons();
            await this.studentClassService.createClasses();
            await this.studentClassService.appRolesAzureAssignments();
            await this.studentClassService.assignClassesToPersons();
            await this.personService.getAllUserPicturesAndSave()
        }
    }
}
