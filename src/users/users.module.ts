import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/users/user.providers";
import { UsersController } from "src/users/users.controller";
import { UsersService } from "src/users/users.service";

@Module({
  imports: [DatabaseModule],
  providers: [...userProvider, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
