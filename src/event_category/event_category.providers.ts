import { EventCategory } from "src/entities/event_category.entity";
import { customEventCategoryRepository } from "src/event_category/event_category.repository";
import { DATA_SOURCE, EVENT_CATEGORY_REPOSITORY } from "src/utils/constants";
import { DataSource } from "typeorm";

export const eventCategoryProvider = [
  {
    provide: EVENT_CATEGORY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource
        .getRepository(EventCategory)
        .extend(customEventCategoryRepository),
    inject: [DATA_SOURCE],
  },
];
