import { ApiResponseProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsString, IsUUID } from "class-validator";

export class NoteResponseDto {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiResponseProperty()
  @IsString()
  title: string;

  @ApiResponseProperty()
  @IsString()
  content: string;

  @ApiResponseProperty()
  @IsUUID()
  userId: string;

  constructor(obj: Partial<NoteResponseDto>) {
    Object.assign(this, obj);
  }
}
