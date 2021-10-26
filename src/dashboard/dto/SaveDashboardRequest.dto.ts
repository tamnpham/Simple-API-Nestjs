import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Widget } from 'src/widget/widget.entity';

export class SaveDashboardRequest {
    @ApiPropertyOptional() //Add this decorator to make properties visible
    id: string;

    @ApiPropertyOptional()
    userId: string;

    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    layoutType: string;

    @ApiPropertyOptional()
    widgets: Widget;
}
   
export default SaveDashboardRequest;