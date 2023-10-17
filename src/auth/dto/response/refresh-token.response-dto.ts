import { ApiResponseProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenResponseDto {
  @ApiResponseProperty()
  @IsJWT()
  accessToken: string;

  @ApiResponseProperty()
  @IsJWT()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
