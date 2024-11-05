import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MonitoringPointService } from './monitoring-point.service';
import { CreateMonitoringPointDto } from './dto/create-monitoringPoint.dto';
import { Public } from '../auth/decorators/public.decorators';

@Public()
@Controller('monitoring-point')
export class MonitoringPointController {
  constructor(
    private readonly monitoringPointService: MonitoringPointService
  ) {}

  @Post(':machineId')
  async createMonitoringPoint(
    @Param('machineId', ParseIntPipe) machineId: number,
    @Body() createMonitoringPointDto: CreateMonitoringPointDto
  ) {
    return await this.monitoringPointService.createMonitoringPoint(
      machineId,
      createMonitoringPointDto
    );
  }

  @Get('all-monitoring-points')
  async findAll() {
    return await this.monitoringPointService.getAllMonitoringPointsWithMachineInfo();
  }
}
