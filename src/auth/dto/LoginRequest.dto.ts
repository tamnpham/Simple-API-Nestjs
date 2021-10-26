import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginRequest {
    @ApiPropertyOptional() //Add this decorator to make properties visible
    username: string;

    @ApiPropertyOptional()
    password: string;
}
   
export default LoginRequest;