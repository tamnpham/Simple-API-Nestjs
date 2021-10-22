import { ApiProperty } from '@nestjs/swagger';

export class User {
@ ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullname: string;
}
   
export default User;