import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class Config {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  additionalProp1: string;

  @ApiProperty()
  @Column()
  additionalProp2: string;

  @ApiProperty()
  @Column()
  additionalProp3: string;

}