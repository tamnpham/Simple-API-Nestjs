import { ApiProperty } from "@nestjs/swagger";

export class RegisterRequest {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    fullname: string;
}
   
export default RegisterRequest;