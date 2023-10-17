import { ApiResponseProperty } from "@nestjs/swagger";

export class GetUsersPaginatedResponseDto {
  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(partial: Partial<GetUsersPaginatedResponseDto>) {
    Object.assign(this, partial);
  }
}
