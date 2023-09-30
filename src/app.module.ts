import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { UsersModule } from "src/users/users.module";
import { EventCategoryModule } from './event_category/event_category.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, EventCategoryModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
