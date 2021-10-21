import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import LoginRequest from './dto/LoginRequest.dto';
import LoginResponse from './dto/LoginResponse.dto';
import { LocalStrategy } from './local.strategy';


@Controller('auth')

  export class AuthController {
      
    constructor(private readonly authService: AuthService) {}

    @Post('register') //method 
    //function(@Body as a user): return value
    register(@Body() user: User): Promise<User> {
      return this.authService.register(user);
    }

    @Post('login') //method 
    @UseGuards(AuthGuard('local'))
    //function(@Body as a user): return value
    login(@Body() loginRequest: LoginRequest): Promise<User> {
      return this.authService.authenticate(loginRequest);
    }
  }
