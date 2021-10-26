import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SaveTaskRequest {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  task: string;

  @ApiPropertyOptional()
  isCompleted: boolean;

  @ApiPropertyOptional()
  userId: string;
}
   
export default SaveTaskRequest;