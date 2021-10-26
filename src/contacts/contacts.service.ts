import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contacts.entity';
import SaveContactRequest from './dto/SaveContactRequest.dto';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactsRepository: Repository<Contact>,
    ){}
    
    //function(parameter): return value
    create(saveContactRequest: SaveContactRequest): Promise<SaveContactRequest> {
        const contactObject = new Contact();
        contactObject.id = saveContactRequest.id;
        contactObject.firstname = saveContactRequest.firstname;
        contactObject.lastname = saveContactRequest.lastname;
        contactObject.title = saveContactRequest.title;
        contactObject.department = saveContactRequest.department;
        contactObject.project = saveContactRequest.project;
        contactObject.avatar = saveContactRequest.avatar;
        contactObject.employeeId = saveContactRequest.employeeId

        return this.contactsRepository.save(contactObject);
    }

    async retrieveAll(): Promise<Contact[]> {
        return this.contactsRepository.find();
    }

    retrieveOne(id: string): Promise<Contact> {
        return this.contactsRepository.findOne(id);
    }

    async delete(id: string): Promise<void> {
        await this.contactsRepository.delete(id);
    }

    async update(id: string, contactInfoUpdate: Contact): Promise<any> {
        await this.contactsRepository.update(
            contactInfoUpdate.id,
            {
                firstname: contactInfoUpdate.firstname,
                lastname: contactInfoUpdate.lastname,
                title: contactInfoUpdate.title,
                department: contactInfoUpdate.department,
                project: contactInfoUpdate.project,
                avatar: contactInfoUpdate.avatar,
                employeeId: contactInfoUpdate.employeeId
            }
        );
    }
}
