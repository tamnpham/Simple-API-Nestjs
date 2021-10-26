import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Widget {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  title: string;

  @ApiPropertyOptional()
  @Column()
  widgetType: string;

  @ApiPropertyOptional()
  @Column()
  minHeight: number;

  @ApiPropertyOptional()
  @Column()
  minWidth: number;
}