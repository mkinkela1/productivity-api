import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsHexColor, IsString, IsUUID } from "class-validator";

export class EventCategoryResponseDto {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsHexColor()
  colorHex: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  constructor(obj: Partial<EventCategoryResponseDto>) {
    Object.assign(this, obj);
  }
}
