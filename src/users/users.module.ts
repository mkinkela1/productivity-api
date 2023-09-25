import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/users/user.providers";
import { UsersService } from "src/users/users.service";

@Module({
  imports: [DatabaseModule],
  providers: [...userProvider, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
