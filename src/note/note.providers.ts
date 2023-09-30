import { DATA_SOURCE, NOTE_REPOSITORY } from "src/common/constants";
import { Note } from "src/entities/note.entity";
import { customNoteRepository } from "src/note/note.repository";
import { DataSource } from "typeorm";

export const noteProvider = [
  {
    provide: NOTE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Note).extend(customNoteRepository),
    inject: [DATA_SOURCE],
  },
];
