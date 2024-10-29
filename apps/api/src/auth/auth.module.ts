import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [AuthService, UserService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
