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

@Module({
  imports: [
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

    UserModule,
    AuthModule,
    CategoryModule,
    UserRegistrationModule,
    FormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
