import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/auth/token.entity';
import { Repository } from 'typeorm';
import { Dashboard } from './dashboard.entity';
import SaveDashboardRequest from './dto/SaveDashboardRequest.dto';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Dashboard)
        private readonly dashboardRepository: Repository<Dashboard>,
        
    ){}
    
    retrieveOne(id: string): Promise<Dashboard> {
        return this.dashboardRepository.findOne(id);
    }

    async update(id: string, dashboardInfoUpdate: Dashboard): Promise<any> {
        await this.dashboardRepository.update(
            id,
            {
                userId: dashboardInfoUpdate.userId,
                title: dashboardInfoUpdate.title,
                layoutType: dashboardInfoUpdate.layoutType,
                widgets: dashboardInfoUpdate.widgets,
            }
        );
    }
}
