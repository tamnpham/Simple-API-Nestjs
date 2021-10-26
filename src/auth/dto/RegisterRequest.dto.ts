import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterRequest {
    @ApiPropertyOptional()
    username: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    password: string;

    @ApiPropertyOptional()
    fullname: string;
}
   
export default RegisterRequest;