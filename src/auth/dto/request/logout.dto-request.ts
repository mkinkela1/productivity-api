import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsString } from "class-validator";

export class LogoutDtoRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken: string;
}
