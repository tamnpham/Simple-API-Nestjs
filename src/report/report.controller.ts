import { Controller, Get, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';

@ApiTags('report-api') //this decorator to tag controller with specific tags in swagger
@Controller('reports')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        ) {}

    @Get('_countBy/:collection/:field') //method 
    // @ApiBody() //this decorator to make discription body in swagger
    //function(@Body as a user): return value
    getReport(@Param('collection') collection: string, @Param('field') field: string): Promise<any>  {
       if (collection == 'tasks'){
        return this.reportService.getReportTasks();
       }

       if (collection == 'contacts'){
        return this.reportService.getReportContacts();
       }
    }
}
