import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import SaveTaskRequest from './dto/SaveTaskRequest.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@ApiTags('task-api') //this decorator to tag controller with specific tags in swagger
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private authService: AuthService,
        ) {}

    @Get() //method
    @ApiResponse({ status: 200, description: 'OK'})
    retrieveAll(): Promise<Task[]> {
        return this.tasksService.retrieveAll();
    }

    @Post() //method 
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'OK'})
    //function(@Body as a user): return value
    create(@Body() task: SaveTaskRequest): Promise<SaveTaskRequest> {
        return this.tasksService.create(task);
    }

    @Get(':id')
    retrieveOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.retrieveOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.tasksService.delete(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string, 
        @Body() taskInfoUpdate: Task,
        @Headers('Authorization') auth: string): Promise<void> {

        // const checkPermission = this.authService.checkMatchUserIdToken
        const token = auth.replace('Bearer ', '')
        const checkPermission = await this.authService.checkMatchUserIdToken(id, token)
        
        if (checkPermission == false){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        
        }
        return this.tasksService.update(id, taskInfoUpdate);
    }
}
