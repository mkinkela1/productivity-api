import { ApiResponseProperty } from "@nestjs/swagger";

export class LoggedInUserResponseDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(obj: LoggedInUserResponseDto) {
    Object.assign(this, obj);
  }
}
