import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      UsersModule,
      JwtModule.register({
        secret: process.env.SECRET_KE || "SECRET",
        signOptions: {
          expiresIn: '300h'
        }
      })
  ]
})
export class AuthModule {}
