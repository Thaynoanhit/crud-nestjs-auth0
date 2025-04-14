import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use((params, next) => {
      if (params.model === 'User' && ['create', 'update'].includes(params.action) && params.args.data['password']) {
        params.args.data['password'] = bcrypt.hashSync(params.args.data['password'], 10)
      }
      return next(params)
    })
  }
}