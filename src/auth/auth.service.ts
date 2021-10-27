import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import LoginResponse from './dto/LoginResponse.dto';
import { MailService } from 'src/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import LogoutRequest from './dto/LogoutRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, //add this to define what Service we will use
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async sendConfirmationEmail(registrationDataUser: User): Promise<User> {
    const payload = {
      username: registrationDataUser.username,
      password: registrationDataUser.password,
      email: registrationDataUser.email,
      fullname: registrationDataUser.fullname,
    };
    const token = this.jwtService.sign(payload);

    // const hashedPassword = await bcrypt.hash(registrationDataUser.password, 10);
    // const createdUser = await this.usersService.create({...registrationDataUser, password: hashedPassword});
    console.log(token);
    // send confirmation mail
    await this.mailService.sendUserConfirmation(registrationDataUser, token);

    return;
  }

  async verifyToken(userToken: string): Promise<string> {
    const UserInfo = this.jwtService.decode(userToken);
    const objectUserInfo = Object(UserInfo);
    console.log(objectUserInfo);

    return 'Your account is already created!';
  }

  async authenticateUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;
    return user;
  }

  async login(loginRequest: any) {
    const payload = {
      username: loginRequest.username,
      password: loginRequest.password,
    };
    const loginResponse = new LoginResponse();
    loginResponse.token = this.jwtService.sign(payload);
    return loginResponse;
  }

  //function(parameter): return value
  async saveToken(token: string, username: string) {
    const tokenObject = new Token();
    const user = this.usersService.findByUsername(username);
    tokenObject.token = token;
    tokenObject.userid = String((await user).id);
    return this.tokenRepository.save(tokenObject);
  }

  async checkMatchUserIdToken(userid: string, token: string): Promise<boolean> {
    const UserInfo = this.jwtService.decode(token);
    const objectUserInfo = Object(UserInfo);
    const user = this.usersService.findByUsername(objectUserInfo.username);
    const userId = (await user).id;
    const userIdString = userId.toString();

    if (userIdString == userid) {
      return true;
    } else {
      return false;
    }
  }

  async checkTokenDB(token: string, userid: string): Promise<boolean> {
    const tokenDB = this.tokenRepository.findOne(userid);
    if ((await tokenDB).token == token) {
      return true;
    } else {
      return false;
    }
  }

  async deactivateUser(logoutRequest: LogoutRequest): Promise<string> {
    const user = this.usersService.findOne(logoutRequest.userid.toString());
    this.saveToken(logoutRequest.token, (await user).username);
    return 'logout sucessfully!';
  }
}
