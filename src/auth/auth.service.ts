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

    async sendConfirmationEmail(registrationDataUser: User): Promise<User> {
        
        const payload = { 
            username: registrationDataUser.username, 
            password: registrationDataUser.password,
            email: registrationDataUser.email,
            fullname: registrationDataUser.fullname
        };
        const token = this.jwtService.sign(payload);

        // const hashedPassword = await bcrypt.hash(registrationDataUser.password, 10);
        // const createdUser = await this.usersService.create({...registrationDataUser, password: hashedPassword});
        console.log(token)
        // send confirmation mail
        await this.mailService.sendUserConfirmation(registrationDataUser, token);

        return ;
    }

    async verifyToken(userToken: string): Promise<string> {
        
        const UserInfo = this.jwtService.decode(userToken);
        const objectUserInfo = Object(UserInfo);
        console.log(objectUserInfo)
        const hashedPassword = await bcrypt.hash(objectUserInfo.password, 10);
        const createdUser = await this.usersService.create({...objectUserInfo, password: hashedPassword});
    
        return 'Your account is already created!';
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
        const payload = { username: loginRequest.username, password: loginRequest.password };
        const loginResponse = new LoginResponse;
        loginResponse.token = this.jwtService.sign(payload);
        return loginResponse;
    }

    async deactivateUser(logoutRequest: any) {
        const Usertoken = this.jwtService.decode(logoutRequest.token);
        console.log(Usertoken)
    }
}
