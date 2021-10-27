import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Column()
  username: string;

  @ApiPropertyOptional()
  @Column({ unique: true })
  email: string;

  @ApiPropertyOptional()
  @Column()
  password: string;

  @ApiPropertyOptional()
  @Column()
  fullname: string;
}
