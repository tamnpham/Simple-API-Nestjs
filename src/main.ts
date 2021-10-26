import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportModule } from './report/report.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend 203')
    .setDescription('The training exercise')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app, 
    config, 
    {
      include: 
      [
        AppModule, 
        AuthModule, 
        ContactsModule, 
        TasksModule, 
        DashboardModule, 
        ReportModule,
      ]
    }
  );
  
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
