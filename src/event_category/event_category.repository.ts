import { EventCategory } from "src/entities/event_category.entity";
import { EventCategoryNotFoundException } from "src/exceptions/event_category.exceptions";
import { isNullOrUndefined } from "src/utils/helpers";
import { Repository } from "typeorm";

export interface IEventCategoryRepository extends Repository<EventCategory> {
  this: Repository<EventCategory>;
  expectOne(id: string, userId: string): Promise<EventCategory>;
}

export const customEventCategoryRepository: Pick<
  IEventCategoryRepository,
  "expectOne"
> = {
  async expectOne(id: string, userId: string): Promise<EventCategory> {
    const eventCategory = await this.findOne({
      where: { id, user: { id: userId } },
    });

    if (isNullOrUndefined(eventCategory)) {
      throw new EventCategoryNotFoundException();
    }

    return eventCategory;
  },
};
