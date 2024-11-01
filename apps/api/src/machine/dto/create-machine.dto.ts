import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MachineType } from '@prisma/client';

const machineTypeValues = Object.values(MachineType).join(', ');

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MachineType, {
    message: `Invalid machine type. Should be one of: ${machineTypeValues}`,
  })
  type: MachineType;
}
