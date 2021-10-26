import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';

@Module({
  providers: [WidgetService]
})
export class WidgetModule {}
