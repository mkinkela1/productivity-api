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
import {
  CurrentUser,
  TCurrentUser,
} from "src/common/decorators/current-user.decorator";
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
  createNote(
    @CurrentUser() user: TCurrentUser,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<NoteResponseDto> {
    return this.noteService.create(createNoteDto, user.id);
  }

  @Get()
  @ApiOkResponse({
    type: NoteResponseDto,
    isArray: true,
  })
  getNotesPaginated(
    @CurrentUser() user: TCurrentUser,
  ): Promise<NoteResponseDto[]> {
    return this.noteService.findAll(user.id);
  }

  @ApiOkResponse({
    type: NoteResponseDto,
  })
  @ApiNotFoundResponse()
  @Get(":id")
  getNote(
    @Param("id") id: string,
    @CurrentUser() user: TCurrentUser,
  ): Promise<NoteResponseDto> {
    return this.noteService.findOne(id, user.id);
  }

  @ApiOkResponse({
    type: NoteResponseDto,
  })
  @ApiNotFoundResponse()
  @Patch(":id")
  updateNote(
    @Param("id") id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser() user: TCurrentUser,
  ): Promise<NoteResponseDto> {
    return this.noteService.update(id, updateNoteDto, user.id);
  }

  @ApiNotFoundResponse()
  @Delete(":id")
  @HttpCode(204)
  removeNote(@Param("id") id: string, @CurrentUser() user: TCurrentUser) {
    return this.noteService.remove(id, user.id);
  }
}
