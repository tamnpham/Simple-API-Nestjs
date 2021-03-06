import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './secret/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { Token } from './token.entity';

@Module(
  // <== decorator
  {
    imports: [
      TypeOrmModule.forFeature([Token]),
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1 hour' },
      }),
      MailModule,
    ],
    exports: [AuthService],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
  },
)
export class AuthModule {}
