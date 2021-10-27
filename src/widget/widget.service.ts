import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './configs.entity';
import { Widget } from './widget.entity';

@Injectable()
export class WidgetService {
  constructor(
    @InjectRepository(Widget)
    private readonly widgetRepository: Repository<Widget>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  retrieveOneWidget(id: string): Promise<Widget> {
    return this.widgetRepository.findOne(id);
  }

  retrieveOneConfig(id: string): Promise<Config> {
    return this.configRepository.findOne(id);
  }

  async addExampleWidget() {
    const exampleWidget = new Widget();

    exampleWidget.title = 'tasks chart widget';
    exampleWidget.widgetType = 'chart circle';
    exampleWidget.minHeight = 150;
    exampleWidget.minWidth = 200;

    this.widgetRepository.save(exampleWidget);
  }

  async addExampleConfig() {
    const exampleConfig = new Config();

    exampleConfig.additionalProp1 = 124;
    exampleConfig.additionalProp2 = 431;
    exampleConfig.additionalProp3 = 353;

    this.configRepository.save(exampleConfig);
  }
}
