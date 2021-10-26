import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppVersion {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column()
  version: string;
}
