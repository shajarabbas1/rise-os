import { Module } from '@nestjs/common';
import UserService from './user.service';
import UserController from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { AppSharedModule } from '../app-shared/app-shared.module';
import QueueModule from '../queue-module/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AppSharedModule, QueueModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
