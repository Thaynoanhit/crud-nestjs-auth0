import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }


    async getUsers(): Promise<User[]> {
      return this.prisma.user.findMany();
    }


     async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
      }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
          data,
          where,
        });
      }
    
      async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
          where,
        });
      }

}
