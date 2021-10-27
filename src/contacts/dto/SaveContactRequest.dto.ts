import { ApiPropertyOptional } from '@nestjs/swagger';

export class SaveContactRequest {
  @ApiPropertyOptional() //Add this decorator to make properties visible
  id: string;

  @ApiPropertyOptional()
  firstname: string;

  @ApiPropertyOptional()
  lastname: string;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  department: string;

  @ApiPropertyOptional()
  project: string;

  @ApiPropertyOptional()
  avatar: string;

  @ApiPropertyOptional()
  employeeId: number;
}

export default SaveContactRequest;
