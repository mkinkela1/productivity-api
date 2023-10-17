import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { GetUsersPaginatedResponseDto } from "src/users/dto/response/get-users-paginated.response-dto";
import { UsersService } from "src/users/users.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [GetUsersPaginatedResponseDto] })
  async getUsersPaginated() {
    const users = await this.usersService.getAll();

    return users.map((user) => new GetUsersPaginatedResponseDto(user));
  }
}
