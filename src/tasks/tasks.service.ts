import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SaveContactRequest from 'src/contacts/dto/SaveContactRequest.dto';
import { Repository } from 'typeorm';
import SaveTaskRequest from './dto/SaveTaskRequest.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ){}
    
    //function(parameter): return value
    create(saveTaskRequest: SaveTaskRequest): Promise<SaveTaskRequest> {
        const taskObject = new Task();
        taskObject.id = saveTaskRequest.id;
        taskObject.task = saveTaskRequest.task;
        taskObject.isCompleted = saveTaskRequest.isCompleted;
        taskObject.userId = saveTaskRequest.userId;

        return this.tasksRepository.save(taskObject);
    }

    async retrieveAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    retrieveOne(id: string): Promise<Task> {
        return this.tasksRepository.findOne(id);
    }

    async delete(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }

    async update(id: string, taskInfoUpdate: Task): Promise<any> {
        await this.tasksRepository.update(
            id,
            {
                task: taskInfoUpdate.task,
                isCompleted: taskInfoUpdate.isCompleted,
                userId: taskInfoUpdate.userId
            }
        );
    }

}
