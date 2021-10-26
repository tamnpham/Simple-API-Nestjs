import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Dashboard } from './dashboard.entity';
import { DashboardService } from './dashboard.service';
import SaveDashboardRequest from './dto/SaveDashboardRequest.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('dashboard-api') //this decorator to tag controller with specific tags in swagger
@Controller('dashboards')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiResponse({ type: Dashboard })
  retrieveOne(@Param('id') id: string): Promise<Dashboard> {
    return this.dashboardService.retrieveOne(id);
  }

  @Put(':id')
  @ApiResponse({ type: Dashboard })
  @ApiBody({ type: SaveDashboardRequest })
  async update(
    @Param('id') id: string,
    @Body() taskInfoUpdate: SaveDashboardRequest,
    @Headers('Authorization') auth: string,
  ): Promise<Dashboard> {
    // const checkPermission = this.authService.checkMatchUserIdToken
    const token = auth.replace('Bearer ', '');
    const checkPermission = await this.authService.checkMatchUserIdToken(
      id,
      token,
    );

    if (checkPermission == false) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.dashboardService.update(id, taskInfoUpdate);
  }
}
