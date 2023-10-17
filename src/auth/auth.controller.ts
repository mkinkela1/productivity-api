import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger/dist/decorators/api-bearer.decorator";
import { AuthService } from "src/auth/auth.service";
import { LoginDtoRequest } from "src/auth/dto/request/login.dto-request";
import { RefreshTokenDtoRequest } from "src/auth/dto/request/refresh-token.dto-request";
import { RegisterDtoRequest } from "src/auth/dto/request/register.dto-request";
import { LoggedInUserResponseDto } from "src/auth/dto/response/logged-in-user.response-dto";
import { LoginResponseDto } from "src/auth/dto/response/login.response-dto";
import { RefreshTokenResponseDto } from "src/auth/dto/response/refresh-token.response-dto";
import { RegisterResponseDto } from "src/auth/dto/response/register.response-dto";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/strategy/local/local.guard";
import {
  CurrentUser,
  TCurrentUser,
} from "src/common/decorators/current-user.decorator";
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
  @ApiExtraModels(RegisterDtoRequest)
  @ApiCreatedResponse({ type: RegisterResponseDto })
  @ApiConflictResponse()
  async register(
    @Body() body: RegisterDtoRequest,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  @ApiOkResponse({ type: LoggedInUserResponseDto })
  @ApiUnauthorizedResponse()
  getLoggedInUser(
    @CurrentUser() user: TCurrentUser,
  ): Promise<LoggedInUserResponseDto> {
    return this.authService.getLoggedInUser(user);
  }

  @Post("/refresh-token")
  @ApiCreatedResponse({ type: RefreshTokenResponseDto })
  @ApiUnauthorizedResponse()
  async refreshToken(
    @Body() body: RefreshTokenDtoRequest,
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(body);
  }
}
