import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  additionalProp1: number;

  @ApiProperty()
  @Column()
  additionalProp2: number;

  @ApiProperty()
  @Column()
  additionalProp3: number;
}
