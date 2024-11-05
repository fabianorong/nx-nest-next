import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SensorService, PrismaService],
  controllers: [SensorController],
})
export class SensorModule {}