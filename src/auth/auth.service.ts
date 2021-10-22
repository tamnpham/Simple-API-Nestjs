import { Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import LoginRequest from './dto/LoginRequest.dto';
import { JwtService } from '@nestjs/jwt';
import LoginResponse from './dto/LoginResponse.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService, //add this to define what Service we will use
        private jwtService: JwtService,
        private mailService: MailService,
        ) {}

    async register(registrationDataUser: User): Promise<User> {
        
        const token = Math.floor(1000 + Math.random() * 9000).toString();

        // const hashedPassword = await bcrypt.hash(registrationDataUser.password, 10);
        // const createdUser = await this.usersService.create({...registrationDataUser, password: hashedPassword});
        
        // send confirmation mail
        await this.mailService.sendUserConfirmation(registrationDataUser, token);

        return ;
    }

    async authenticateWithRequest(loginRequest: LoginRequest): Promise<User>{

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

    async login(loginRequest: any) {
        const payload = { username: loginRequest.username, sub: loginRequest.password };
        const loginResponse = new LoginResponse;
        loginResponse.token = this.jwtService.sign(payload);
        return loginResponse;
    }
}
