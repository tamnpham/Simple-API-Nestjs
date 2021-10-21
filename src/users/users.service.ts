import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}
    
    //function(parameter): return value
    create(user: User): Promise<User> {
        const userObject = new User();
        userObject.username = user.username;
        userObject.password = user.password;
        userObject.email = user.email;
        userObject.fullname = user.fullname;

        return this.usersRepository.save(userObject);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async findByUsername(username: string) {
        const user = await this.usersRepository.findOne({ username });
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
}
