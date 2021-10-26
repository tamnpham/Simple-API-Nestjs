import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AppVersion } from './appVersion.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('app/version')
@ApiTags('app-api') //this decorator to tag controller with specific tags in swagger
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Req() req) {
  //   return "your profile!";
  // }

  
  @Get()
  @ApiResponse({type: AppVersion})
  //function(@Body as a user): return value
  getVersion(): Promise<AppVersion[]> {
    return this.appService.getVersion();
  }
}
