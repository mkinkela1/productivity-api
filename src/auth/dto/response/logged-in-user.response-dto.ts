import { ApiResponseProperty } from "@nestjs/swagger";

export class LoggedInUserResponseDto {
  @ApiResponseProperty()
  id: string;

  constructor(obj: LoggedInUserResponseDto) {
    Object.assign(this, obj);
  }
}
