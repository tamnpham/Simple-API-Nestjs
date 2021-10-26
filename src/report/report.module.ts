import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TasksService } from 'src/tasks/tasks.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { Task } from 'src/tasks/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/contacts.entity';
import { ContactsService } from 'src/contacts/contacts.service';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Contact])
  ],
  providers: [ReportService, TasksService, ContactsService],
  controllers: [ReportController]
})
export class ReportModule {}
