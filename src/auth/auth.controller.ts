import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';


@Controller('auth')
    export class AuthController {
        
        constructor(private readonly authService: AuthService) {}

        @Post('register') //method 
        //function(@Body as a user): return value
        register(@Body() user: User): Promise<User> {
          return this.authService.create(user);
        }

        @Post('login') //method 
        //function(@Body as a user): return value
        login(@Body() user: User): Promise<User> {
          return this.authService.create(user);
        }
}
