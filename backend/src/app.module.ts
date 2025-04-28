import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/index';

import UserModule from './modules/user/user.module';
import AuthModule from './modules/auth/auth.module';
import CategoryModule from './modules/category/category.module';
import UserRegistrationModule from './modules/user-registration/user-registration.module';
import FormModule from './modules/form/form.module';
import { AppSharedModule } from './modules/app-shared/app-shared.module';
import UploadedFileModule from './modules/file/uploaded-file.module';
import { BullModule } from '@nestjs/bull';
import QueueModule from './modules/queue-module/queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [appConfig],
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRE_IN') },
      }),
    }),

    // get the db details from the db.config.ts file
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('database'),
        };
      },
    }),

    QueueModule,
    UploadedFileModule,
    UserModule,
    AppSharedModule,
    AuthModule,
    CategoryModule,
    UserRegistrationModule,
    FormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
