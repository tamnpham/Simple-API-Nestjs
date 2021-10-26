import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/secret/constants';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { Token } from 'src/auth/token.entity';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Token]),
    UsersModule,
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret, signOptions: { expiresIn: '1 hour' }}),
    MailModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, AuthService, LocalStrategy, JwtStrategy],
  exports: [TasksService]
})
export class TasksModule {}
