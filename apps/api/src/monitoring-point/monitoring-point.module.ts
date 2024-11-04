import { Module } from '@nestjs/common';
import { MonitoringPointService } from './monitoring-point.service';
import { MonitoringPointController } from './monitoring-point.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [MonitoringPointService, PrismaService],
  controllers: [MonitoringPointController],
})
export class MonitoringPointModule {}
