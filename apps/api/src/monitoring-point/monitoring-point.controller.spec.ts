import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringPointController } from './monitoring-point.controller';

describe('MonitoringPointController', () => {
  let controller: MonitoringPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoringPointController],
    }).compile();

    controller = module.get<MonitoringPointController>(MonitoringPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
