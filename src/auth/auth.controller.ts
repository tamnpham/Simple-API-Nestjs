import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import LogoutRequest from './dto/LogoutRequest.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import RegisterRequest from './dto/RegisterRequest.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginRequest } from './dto/LoginRequest.dto';
import LoginResponse from './dto/LoginResponse.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth-api') //this decorator to tag controller with specific tags in swagger
@Controller('auth')

  export class AuthController {
      
    constructor(
      private readonly authService: AuthService,
      private jwtService: JwtService,
    ) {}
    
    
    @Post('register') //method 
    @ApiResponse({type: User})
    @ApiBody({type: RegisterRequest}) //this decorator to make discription body in swagger
    //function(@Body as a user): return value
    register(@Body() user: User): Promise<User> {
      return this.authService.sendConfirmationEmail(user);
    }


    @UseGuards(LocalAuthGuard)
    @Post('login') //method 
    @ApiResponse({type: LoginResponse})
    @ApiBody({type: LoginRequest})
    //function(@Body as a user): return value
    login(@Body() LoginRequest: LoginRequest) {
      return this.authService.login(LoginRequest);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout') //method 
    @ApiBody({type: LogoutRequest})
    //function(@Body as a user): return value
    logout(@Body() LoginRequest: LogoutRequest) {
      return this.authService.login(LoginRequest);
    }
  }
