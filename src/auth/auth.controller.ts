import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')

  export class AuthController {
      
    constructor(
      private readonly authService: AuthService,
      private jwtService: JwtService,
    ) {}

    @Post('register') //method 
    //function(@Body as a user): return value
    register(@Body() user: User): Promise<User> {
      return this.authService.register(user);
    }

    @Post('login') //method 
    @UseGuards(AuthGuard('local'))
    //function(@Body as a user): return value
    login(@Body() user: User) {
      // const user = req.user;
      const payload = { username: user.username, sub: user.password };
      //   return {
      //     access_token: this.jwtService.sign(payload),
      //   };
      const accessToken = this.jwtService.sign(payload, {expiresIn: '60s'});
      return { accessToken };
    }
  }
