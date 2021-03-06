import { ApiPropertyOptional } from '@nestjs/swagger';
import { Widget } from 'src/widget/widget.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dashboard {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiPropertyOptional()
  @Column()
  userId: string;

  @ApiPropertyOptional()
  @Column({ unique: true })
  title: string;

  @ApiPropertyOptional()
  @Column()
  layoutType: string;

  @ApiPropertyOptional()
  widgets: Widget;
}
