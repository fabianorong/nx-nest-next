import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { PrismaService } from '../prisma.service';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}

  async createMachine(createMachineDto: CreateMachineDto) {
    const { ...machine } = createMachineDto;
    return await this.prisma.machine.create({
      data: {
        ...machine,
      },
    });
  }

  async findAll() {
    return await this.prisma.machine.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.machine.findUnique({
      where: {
        id,
      },
    });
  }

  async updateMachine(id: number, data: UpdateMachineDto) {
    await this.machineExists(id);
    return await this.prisma.machine.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteMachine(id: number) {
    await this.machineExists(id);

    return await this.prisma.machine.delete({
      where: {
        id,
      },
    });
  }

  async machineExists(id: number) {
    const machine = await this.prisma.machine.findUnique({
      where: {
        id,
      },
    });

    if (!machine) throw new NotFoundException('Machine not found');
  }
}
