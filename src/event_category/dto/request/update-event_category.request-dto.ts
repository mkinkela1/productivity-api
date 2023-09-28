import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsString } from "class-validator";

export class UpdateEventCategoryRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsHexColor()
  colorHex: string;
}
