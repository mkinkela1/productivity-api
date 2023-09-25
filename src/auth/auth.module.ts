import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { LocalStrategy } from "src/auth/strategy/local/local.strategy";
import { configService } from "src/config/config.service";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: configService.getJwtTokenSecret(),
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
