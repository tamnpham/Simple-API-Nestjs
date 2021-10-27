import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WidgetService } from 'src/widget/widget.service';
import { Repository } from 'typeorm';
import { Dashboard } from './dashboard.entity';
import { CsvParser } from 'nest-csv-parser';
import { createReadStream } from 'fs';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: Repository<Dashboard>,
    private widgetService: WidgetService,
    private readonly csvParser: CsvParser,
  ) {}

  retrieveOne(id: string): Promise<Dashboard> {
    return this.dashboardRepository.findOne(id);
  }

  async update(id: string, dashboardInfoUpdate: Dashboard): Promise<any> {
    await this.dashboardRepository.update(id, {
      userId: dashboardInfoUpdate.userId,
      title: dashboardInfoUpdate.title,
      layoutType: dashboardInfoUpdate.layoutType,
      widgets: dashboardInfoUpdate.widgets,
    });
  }

  async parse() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const csv = require('csv-parser');
    const results = [];
    const dashboardImport = new Dashboard();
    // Create stream from file (or get it from S3)
    await createReadStream('./src/dashboard/test2.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        dashboardImport.layoutType = results[0].layoutType;
        dashboardImport.title = results[0].title;
        dashboardImport.userId = results[0].userId;
        console.log(dashboardImport);
        this.dashboardRepository.save(dashboardImport);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      });

    // console.log(dashboardImport);
  }

  async export() {
    const exportDashboard = await this.retrieveOne('4');
    const exportWidget = await this.widgetService.retrieveOneWidget('2');
    const exportConfig = await this.widgetService.retrieveOneConfig('1');

    exportWidget.configs = exportConfig;
    exportDashboard.widgets = exportWidget;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ObjectsToCsv = require('objects-to-csv');

    const data = [exportDashboard];

    (async () => {
      const csv = new ObjectsToCsv(data);

      // Save to file:
      await csv.toDisk('./src/dashboard/test.csv');

      // Return the CSV file as string:
      console.log(await csv.toString());
    })();
  }

  async addExample() {
    const exampleDashboard = new Dashboard();

    exampleDashboard.layoutType = 'circle';
    exampleDashboard.title = 'Dashboard';
    exampleDashboard.userId = '1';

    this.dashboardRepository.save(exampleDashboard);
    this.widgetService.addExampleConfig();
    this.widgetService.addExampleWidget();
  }
}
