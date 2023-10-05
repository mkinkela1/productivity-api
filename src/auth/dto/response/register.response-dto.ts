import { ApiResponseProperty } from "@nestjs/swagger";

export class RegisterResponseDto {
  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(obj: Partial<RegisterResponseDto>) {
    Object.assign(this, obj);
  }
}
