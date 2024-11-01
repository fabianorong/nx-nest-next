import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { MachineService } from './machine.service';
import { Public } from '../auth/decorators/public.decorators';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Public()
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('create-machine')
  async createMachine(@Body() createMachineDto: CreateMachineDto) {
    return await this.machineService.createMachine(createMachineDto);
  }

  @Get('all-machines')
  async allMachines() {
    return await this.machineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.machineService.findOne(id);
  }

  @Patch(':id')
  async updateMachine(
    @Body() updateMachineDto: UpdateMachineDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.machineService.updateMachine(id, updateMachineDto);
  }

  @Delete(':id')
  async deleteMachine(@Param('id', ParseIntPipe) id: number) {
    return await this.machineService.deleteMachine(id);
  }
}
