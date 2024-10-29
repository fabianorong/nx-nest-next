import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { verify } from 'argon2';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exists!');
    return this.userService.create(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatched = await verify(user.password, password);
    if (!isPasswordMatched) throw new UnauthorizedException('Invalid password');
    return { id: user.id, name: user.name, role: user.role };
  }

  async login(userId: number, name: string, role: Role) {
    await this.userService.findOne(userId);
    return {
      id: userId,
      name: name,
      role,
    };
  }
}
