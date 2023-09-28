import { TEventCategory } from "src/entities/event_category.entity";
import { EventCategoryResponseDto } from "src/event_category/dto/response/event_category.response-dto";

export class EventCategoryMapper {
  toDtoEventCategoryResponse(
    eventCategory: TEventCategory,
  ): EventCategoryResponseDto {
    return new EventCategoryResponseDto({
      id: eventCategory.id,
      name: eventCategory.name,
      colorHex: eventCategory.colorHex,
      userId: eventCategory.user.id,
    });
  }

  toDtoEventCategoryResponseList(
    eventCategoryList: TEventCategory[],
  ): EventCategoryResponseDto[] {
    return eventCategoryList.map((eventCategory) =>
      this.toDtoEventCategoryResponse(eventCategory),
    );
  }
}
