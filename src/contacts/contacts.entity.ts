import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Contact {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiPropertyOptional()
  @Column()
  firstname: string;

  @ApiPropertyOptional()
  @Column()
  lastname: string;

  @ApiPropertyOptional()
  @Column()
  title: string;

  @ApiPropertyOptional()
  @Column()
  department: string;

  @ApiPropertyOptional()
  @Column()
  project: string;

  @ApiPropertyOptional()
  @Column()
  avatar: string;

  @ApiPropertyOptional()
  @Column()
  employeeId: number;

}