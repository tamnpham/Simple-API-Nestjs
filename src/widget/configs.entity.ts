import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Config {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  additionalProp1: number;

  @ApiProperty()
  @Column()
  additionalProp2: number;

  @ApiProperty()
  @Column()
  additionalProp3: number;

}