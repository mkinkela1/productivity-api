import { TNote } from "src/entities/note.entity";
import { NoteResponseDto } from "src/note/dto/response/note.response-dto";

export class NoteMapper {
  toDtoNoteResponse(note: TNote): NoteResponseDto {
    return new NoteResponseDto({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  }

  toDtoNoteResponseList(noteList: TNote[]): NoteResponseDto[] {
    return noteList.map((note) => this.toDtoNoteResponse(note));
  }
}
