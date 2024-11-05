import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { Public } from '../auth/decorators/public.decorators';

@Public()
@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post(':monitoringPointId')
  async createSensor(
    @Param('monitoringPointId', ParseIntPipe) monitoringPointId: number,
    @Body() createSensorDto: CreateSensorDto
  ) {
    return await this.sensorService.createSensor(
      monitoringPointId,
      createSensorDto
    );
  }
}
