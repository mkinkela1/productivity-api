import { EventCategory } from "src/entities/event_category.entity";
import { DATA_SOURCE, EVENT_CATEGORY_REPOSITORY } from "src/utils/constants";
import { DataSource } from "typeorm";

export const eventCategoryProvider = [
  {
    provide: EVENT_CATEGORY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventCategory),
    inject: [DATA_SOURCE],
  },
];
