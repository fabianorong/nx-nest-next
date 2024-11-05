import { SensorModel } from '@prisma/client';
import { IsEnum } from 'class-validator';

const SensorModelValues = Object.values(SensorModel).join(', ');

export class CreateSensorDto {
  @IsEnum(SensorModel, {
    message: `Invalid machine type. Should be one of: ${SensorModelValues}`,
  })
  model: SensorModel;
}
