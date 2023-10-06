import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { EventCategoryModule } from "src/event_category/event_category.module";
import { NoteModule } from "src/note/note.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventCategoryModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
