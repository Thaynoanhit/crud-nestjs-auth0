import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User as UserModel} from '@prisma/client';
import { UserService } from './user.service';
import { Prisma } from 'generated/prisma';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
constructor(private userService: UserService) {}

  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers();
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
  
}