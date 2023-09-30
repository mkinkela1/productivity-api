import { isNullOrUndefined } from "src/common/helpers";
import { Note } from "src/entities/note.entity";
import { NoteNotFoundException } from "src/exceptions/note.exceptions";
import { Repository } from "typeorm";

export interface INoteRepository extends Repository<Note> {
  this: Repository<Note>;
  expectOne(id: string, userId: string): Promise<Note>;
}

export const customNoteRepository: Pick<INoteRepository, "expectOne"> = {
  async expectOne(id: string, userId: string): Promise<Note> {
    const note = await this.findOne({
      where: { id, user: { id: userId } },
    });

    if (isNullOrUndefined(note)) {
      throw new NoteNotFoundException();
    }

    return note;
  },
};
