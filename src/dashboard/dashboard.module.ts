import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Dashboard } from './dashboard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { AuthModule } from 'src/auth/auth.module';
import { Token } from 'src/auth/token.entity';
import { jwtConstants } from 'src/auth/secret/constants';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dashboard]),
    TypeOrmModule.forFeature([Token]),
    UsersModule,
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret, signOptions: { expiresIn: '1 hour' }}),
    MailModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService, AuthService, LocalStrategy, JwtStrategy]
})
export class DashboardModule {}
