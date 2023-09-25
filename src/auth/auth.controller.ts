import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { LoginDtoRequest } from "src/auth/dto/request/login.dto-request";
import { RegisterDtoRequest } from "src/auth/dto/request/register.dto-request";
import { LocalAuthGuard } from "src/auth/strategy/local/local.guard";
import { TUser } from "src/entities/user.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDtoRequest })
  @Post("/login")
  @ApiExtraModels(LoginDtoRequest)
  async login(@Request() request: Request & { user: TUser }) {
    return this.authService.login(request.user);
  }

  @Post("/register")
  async register(@Body() body: RegisterDtoRequest) {
    return this.authService.register(body);
  }
}
