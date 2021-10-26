import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppVersion } from './appVersion.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppVersion)
    private readonly appRepository: Repository<AppVersion>,
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  getVersion(): Promise<AppVersion[]> {
    return this.appRepository.find();
  }
}
