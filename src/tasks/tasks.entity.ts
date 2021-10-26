import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Task {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiPropertyOptional()
  @Column()
  task: string;

  @ApiPropertyOptional()
  @Column()
  isCompleted: boolean;

  @ApiPropertyOptional()
  @Column()
  userId: string;

}