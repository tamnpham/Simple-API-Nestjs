import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './users.entity';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post() //method 
  @ApiBody({type: User})
  //function(@Body as a user): return value
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // @Get() //method
  // @UseGuards(JwtAuthGuard)
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
