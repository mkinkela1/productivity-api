import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsString, IsUUID } from "class-validator";

export class CreateEventCategoryRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsHexColor()
  colorHex: string;

  @ApiProperty()
  @IsUUID()
  userId: string;
}
