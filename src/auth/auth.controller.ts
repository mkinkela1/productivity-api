import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger/dist/decorators/api-bearer.decorator";
import { AuthService } from "src/auth/auth.service";
import { LoginDtoRequest } from "src/auth/dto/request/login.dto-request";
import { RegisterDtoRequest } from "src/auth/dto/request/register.dto-request";
import { LoginResponseDto } from "src/auth/dto/response/login.response-dto";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/strategy/local/local.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { TUser } from "src/entities/user.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDtoRequest })
  @Post("/login")
  @ApiExtraModels(LoginDtoRequest)
  @ApiCreatedResponse({ type: LoginResponseDto })
  async login(@CurrentUser() user: TUser): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @Post("/register")
  async register(@Body() body: RegisterDtoRequest) {
    return this.authService.register(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  @ApiUnauthorizedResponse()
  getLoggedInUser(@CurrentUser() user: TUser): TUser {
    return user;
  }
}
