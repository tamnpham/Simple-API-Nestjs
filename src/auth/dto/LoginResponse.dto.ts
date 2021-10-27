import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponse {
  @ApiPropertyOptional()
  token: string;

  @ApiPropertyOptional()
  refreshToken: string;
}

export default LoginResponse;
