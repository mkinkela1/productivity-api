import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/strategy/jwt/jwt.strategy";
import { LocalStrategy } from "src/auth/strategy/local/local.strategy";
import { configService } from "src/config/config.service";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configService.getJwtTokenSecret(),
      signOptions: { expiresIn: "5m" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
