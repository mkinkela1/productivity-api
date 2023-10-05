import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/auth/auth.controller";
import { AuthMapper } from "src/auth/auth.mapper";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/strategy/jwt/jwt.strategy";
import { LocalStrategy } from "src/auth/strategy/local/local.strategy";
import { configService } from "src/config/config.service";
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/users/user.providers";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configService.getJwtTokenSecret(),
      signOptions: { expiresIn: configService.getJwtTokenDuration() },
    }),
  ],
  providers: [
    ...userProvider,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthMapper,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
