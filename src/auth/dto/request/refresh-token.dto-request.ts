import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDtoRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken: string;
}
