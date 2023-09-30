import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { NoteMapper } from "src/note/node.mapper";
import { NoteController } from "src/note/note.controller";
import { noteProvider } from "src/note/note.providers";
import { NoteService } from "src/note/note.service";

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [...noteProvider, NoteService, NoteMapper],
})
export class NoteModule {}
