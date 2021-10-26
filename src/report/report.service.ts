import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/contacts.entity';
import { ContactsService } from 'src/contacts/contacts.service';
import { Task } from 'src/tasks/tasks.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
    constructor(
        private tasksService: TasksService,
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,

        private contactsService: ContactsService,
        @InjectRepository(Contact)
        private readonly contactsRepository: Repository<Contact>,
    ){}

    async getReportTasks(): Promise<any> {
        
        const listRecordTasks = await this.tasksService.retrieveAll();
        let countIsCompleted = 0
        for (let entry of listRecordTasks) {
            if (entry.isCompleted == true){
                countIsCompleted += 1;
            }
        }

        const report = {
            Completed: countIsCompleted,
            NotCompleted: listRecordTasks.length - countIsCompleted
        }

        return report
    }

    async getReportContacts(): Promise<any> {
        
        const listRecordContacts = await this.contactsService.retrieveAll();
        const arrayTitle = []

        for (let entry of listRecordContacts) {
            arrayTitle.push(entry.title)
        }
        // console.log(arrayTitle)

        const report = {};
        for (let title of arrayTitle){
            report[title] = report[title] ? report[title] + 1 : 1;
        }

        return report
    }
}
