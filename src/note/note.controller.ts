import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger/dist/decorators/api-bearer.decorator";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { TUser } from "src/entities/user.entity";
import { CreateNoteDto } from "src/note/dto/request/create-note.dto";
import { UpdateNoteDto } from "src/note/dto/request/update-note.dto";
import { NoteResponseDto } from "src/note/dto/response/note.response-dto";
import { NoteService } from "src/note/note.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("note")
@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiCreatedResponse({ type: NoteResponseDto })
  create(
    @CurrentUser() user: TUser,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<NoteResponseDto> {
    return this.noteService.create(createNoteDto, user.id);
  }

  @Get()
  @ApiOkResponse({
    type: NoteResponseDto,
    isArray: true,
  })
  findAll(@CurrentUser() user: TUser): Promise<NoteResponseDto[]> {
    return this.noteService.findAll(user.id);
  }

  @ApiOkResponse({
    type: NoteResponseDto,
  })
  @ApiNotFoundResponse()
  @Get(":id")
  findOne(
    @Param("id") id: string,
    @CurrentUser() user: TUser,
  ): Promise<NoteResponseDto> {
    return this.noteService.findOne(id, user.id);
  }

  @ApiOkResponse({
    type: NoteResponseDto,
  })
  @ApiNotFoundResponse()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser() user: TUser,
  ): Promise<NoteResponseDto> {
    return this.noteService.update(id, updateNoteDto, user.id);
  }

  @ApiNotFoundResponse()
  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string, @CurrentUser() user: TUser) {
    return this.noteService.remove(id, user.id);
  }
}
