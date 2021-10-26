import { Controller, Get, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('report-api') //this decorator to tag controller with specific tags in swagger
@Controller('reports')
export class ReportController {
    @Get('_countBy/:collection/:field') //method 
    // @ApiBody() //this decorator to make discription body in swagger
    //function(@Body as a user): return value
    findOne(@Param('collection') collection: string, @Param('field') field: string)  {
       
    }
}
