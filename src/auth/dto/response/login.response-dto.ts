import { ApiResponseProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(obj: Partial<LoginResponseDto>) {
    Object.assign(this, obj);
  }
}
