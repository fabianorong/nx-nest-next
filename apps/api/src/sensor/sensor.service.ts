import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSensorDto } from './dto/create-sensor.dto';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  async createSensor(
    monitoringPointId: number,
    createSensorDto: CreateSensorDto
  ) {
    try {
      return await this.prisma.sensor.create({
        data: {
          model: createSensorDto.model,
          monitoringPoint: {
            connect: {
              id: monitoringPointId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed to assign sensor to monitoring point',
        error: error,
      };
    }
  }
}
