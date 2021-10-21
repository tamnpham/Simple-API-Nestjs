import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TasksModule, TypeOrmModule.forRoot(), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
