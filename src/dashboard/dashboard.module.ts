import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Dashboard } from './dashboard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Token } from 'src/auth/token.entity';
import { jwtConstants } from 'src/auth/secret/constants';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { WidgetService } from 'src/widget/widget.service';
import { WidgetModule } from 'src/widget/widget.module';
import { Widget } from 'src/widget/widget.entity';
import { Config } from 'src/widget/configs.entity';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dashboard]),
    TypeOrmModule.forFeature([Token]),
    TypeOrmModule.forFeature([Widget]),
    TypeOrmModule.forFeature([Config]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 hour' },
    }),
    MailModule,
    WidgetModule,
    CsvModule,
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    WidgetService,
  ],
})
export class DashboardModule {}
