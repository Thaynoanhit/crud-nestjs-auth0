import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User as UserModel} from '@prisma/client';
import { UserService } from './user.service';
import { Prisma, PrismaClient } from 'generated/prisma';

@Controller('user')
export class UserController {
constructor(private userService: UserService) {}

  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers();
  }
  
  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Put(':id')
  async updateUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
