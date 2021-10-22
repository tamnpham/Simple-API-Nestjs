import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    TasksModule, 
    TypeOrmModule.forRoot(), 
    AuthModule, 
    MailModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
