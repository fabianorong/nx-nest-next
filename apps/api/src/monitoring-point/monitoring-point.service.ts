import { Injectable } from '@nestjs/common';
import { CreateMonitoringPointDto } from './dto/create-monitoringPoint.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MonitoringPointService {
  constructor(private prisma: PrismaService) {}

  async createMonitoringPoint(
    machineId: number,
    createMonitoringPointDto: CreateMonitoringPointDto
  ) {
    try {
      return await this.prisma.monitoringPoint.create({
        data: {
          name: createMonitoringPointDto.name,
          machine: {
            connect: {
              id: machineId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed to create monitoring point',
        error: error,
      };
    }
  }
}
