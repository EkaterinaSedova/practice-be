import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      UsersModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              secret: configService.get('SECRET_KEY'),
              signOptions: {
                  expiresIn: configService.get('EXPIRES_IN'),
              },
          }),
      })
  ]
})
export class AuthModule {}
