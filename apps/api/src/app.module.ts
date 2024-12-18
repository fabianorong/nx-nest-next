import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { MachineModule } from './machine/machine.module';
import { MonitoringPointModule } from './monitoring-point/monitoring-point.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), MachineModule, MonitoringPointModule, SensorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
