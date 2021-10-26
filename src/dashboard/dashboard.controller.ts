import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Dashboard } from './dashboard.entity';
import { DashboardService } from './dashboard.service';
import SaveDashboardRequest from './dto/SaveDashboardRequest.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('dashboard-api') //this decorator to tag controller with specific tags in swagger
@Controller('dashboards')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    @ApiResponse({type: Dashboard})
    retrieveOne(@Param('id') id: string): Promise<Dashboard> {
        return this.dashboardService.retrieveOne(id);
    }

    @Put(':id')
    @ApiResponse({type: Dashboard})
    @ApiBody({type: SaveDashboardRequest})
    update(@Param('id') id: string, @Body() taskInfoUpdate: SaveDashboardRequest): Promise<Dashboard> {
        return this.dashboardService.update(id, taskInfoUpdate);
    }
}
