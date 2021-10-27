import { ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Config } from './configs.entity';

@Entity()
export class Widget {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
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

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { $ref: getSchemaPath(Config) },
  })
  configs: Config;
}
