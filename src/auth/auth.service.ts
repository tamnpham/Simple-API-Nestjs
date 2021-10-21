import { Body, Injectable, Post } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}
 
    //function(parameter): return value
    create(user: User): Promise<User> {
        return this.usersService.create(user);
    }

}
