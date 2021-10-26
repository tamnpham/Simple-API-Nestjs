import { Body, Controller, Delete, Get , HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Contact } from './contacts.entity';
import { ContactsService } from './contacts.service';
import SaveContactRequest from './dto/SaveContactRequest.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('contact-api') //this decorator to tag controller with specific tags in swagger
@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {}

    @Get() //method
    @ApiResponse({ status: 200, description: 'OK'})
    retrieveAll(): Promise<Contact[]> {
        return this.contactsService.retrieveAll();
    }

    @Post() //method 
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'OK'})
    //function(@Body as a user): return value
    create(@Body() contact: SaveContactRequest): Promise<SaveContactRequest> {
        return this.contactsService.create(contact);
    }

    @Get(':id')
    retrieveOne(@Param('id') id: string): Promise<Contact> {
        return this.contactsService.retrieveOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.contactsService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() taskInfoUpdate: Contact): Promise<void> {
        return this.contactsService.update(id, taskInfoUpdate);
    }
}
