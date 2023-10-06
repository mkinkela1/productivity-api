import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { UsersService } from "src/users/users.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsersPaginated() {
    return this.usersService.getAll();
  }
}
