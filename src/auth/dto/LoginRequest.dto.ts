import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
    @ApiProperty() //Add this decorator to make properties visible
    username: string;

    @ApiProperty()
    password: string;
}
   
export default LoginRequest;