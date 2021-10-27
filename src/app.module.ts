import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { ContactsModule } from './contacts/contacts.module';
import { ReportModule } from './report/report.module';
import { WidgetModule } from './widget/widget.module';
import { AppVersion } from './appVersion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppVersion]),
    UsersModule,
    TasksModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DashboardModule,
    ContactsModule,
    ReportModule,
    WidgetModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
