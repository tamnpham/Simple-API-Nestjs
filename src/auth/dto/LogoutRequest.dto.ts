import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LogoutRequest {
    @ApiPropertyOptional()
    token: string;

    @ApiPropertyOptional()
    userid: number;
}
   
export default LogoutRequest;