import { Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import LoginRequest from './dto/LoginRequest.dto';
import LoginResponse from './dto/LoginResponse.dto';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async register(registrationDataUser: User): Promise<User> {
        
        const hashedPassword = await bcrypt.hash(registrationDataUser.password, 10);
  
        const createdUser = await this.usersService.create({...registrationDataUser, password: hashedPassword});

        return createdUser;
    }

    async authenticate(loginRequest: LoginRequest): Promise<User>{

        const username = loginRequest.username;
        const password = loginRequest.password;

        const user = await this.usersService.findByUsername(username);

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }

        user.password = undefined;

        return user;
    }

    async authenticateUsernameAndPassword(username: string, password: string): Promise<User>{

        const user = await this.usersService.findByUsername(username);

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }

        user.password = undefined;

        return user;
    }

}
