import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './configs.entity';
import { Widget } from './widget.entity';
import { WidgetService } from './widget.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Widget]),
    TypeOrmModule.forFeature([Config]),
  ],
  controllers: [],
  providers: [WidgetService],
})
export class WidgetModule {}
