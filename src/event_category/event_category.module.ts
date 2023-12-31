import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { EventCategoryController } from "src/event_category/event_category.controller";
import { EventCategoryMapper } from "src/event_category/event_category.mapper";
import { eventCategoryProvider } from "src/event_category/event_category.providers";
import { EventCategoryService } from "src/event_category/event_category.service";
import { userProvider } from "src/users/user.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [EventCategoryController],
  providers: [
    ...eventCategoryProvider,
    ...userProvider,
    EventCategoryService,
    EventCategoryMapper,
  ],
})
export class EventCategoryModule {}
