import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import LoginRequest from './dto/LoginRequest.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import RegisterRequest from './dto/RegisterRequest.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth-api') //this decorator to tag controller with specific tags in swagger
@Controller('auth')

  export class AuthController {
      
    constructor(
      private readonly authService: AuthService,
      private jwtService: JwtService,
    ) {}
    
    
    @Post('register') //method 
    @ApiBody({type: RegisterRequest}) //this decorator to make discription body in swagger
    //function(@Body as a user): return value
    register(@Body() user: User): Promise<User> {
      return this.authService.sendConfirmationEmail(user);
    }


    @UseGuards(LocalAuthGuard)
    @Post('login') //method 
    @ApiBody({type: LoginRequest})
    //function(@Body as a user): return value
    login(@Body() LoginRequest: LoginRequest) {
      return this.authService.login(LoginRequest);
    }

    
  }
