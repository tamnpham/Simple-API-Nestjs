import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username', //super function call contructor of father's class and let it know username field is username in payload
      passwordField: 'password',
    });
  }

  validate(username: string, password: string): Promise<any> {
    const user = this.authService.authenticateUsernameAndPassword(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('log in failed');
    }

    return user;
  }
}
