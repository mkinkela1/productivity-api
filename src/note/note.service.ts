import { Inject, Injectable } from "@nestjs/common";
import { NOTE_REPOSITORY } from "src/common/constants";
import { CreateNoteDto } from "src/note/dto/request/create-note.dto";
import { UpdateNoteDto } from "src/note/dto/request/update-note.dto";
import { NoteResponseDto } from "src/note/dto/response/note.response-dto";
import { NoteMapper } from "src/note/node.mapper";
import { INoteRepository } from "src/note/note.repository";

@Injectable()
export class NoteService {
  constructor(
    @Inject(NOTE_REPOSITORY)
    private noteRepository: INoteRepository,

    private mapper: NoteMapper,
  ) {}

  async create(
    createNoteDto: CreateNoteDto,
    userId: string,
  ): Promise<NoteResponseDto> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      user: { id: userId },
    });

    const newNote = await this.noteRepository.save(note);

    return this.mapper.toDtoNoteResponse(newNote);
  }

  async findAll(userId: string): Promise<NoteResponseDto[]> {
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
    });

    return this.mapper.toDtoNoteResponseList(notes);
  }

  async findOne(id: string, userId: string): Promise<NoteResponseDto> {
    const note = await this.noteRepository.expectOne(id, userId);

    return this.mapper.toDtoNoteResponse(note);
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<NoteResponseDto> {
    const note = await this.noteRepository.expectOne(id, userId);

    const obj = { ...note, ...updateNoteDto };

    const updatedNote = await this.noteRepository.save(obj);

    return this.mapper.toDtoNoteResponse(updatedNote);
  }

  async remove(id: string, userId: string) {
    await this.noteRepository.expectOne(id, userId);

    return await this.noteRepository.delete({ id, user: { id: userId } });
  }
}
