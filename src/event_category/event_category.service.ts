import { Inject, Injectable } from "@nestjs/common";
import { EVENT_CATEGORY_REPOSITORY } from "src/common/constants";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";
import { UpdateEventCategoryRequestDto } from "src/event_category/dto/request/update-event_category.request-dto";
import { EventCategoryResponseDto } from "src/event_category/dto/response/event_category.response-dto";
import { EventCategoryMapper } from "src/event_category/event_category.mapper";
import { IEventCategoryRepository } from "src/event_category/event_category.repository";

@Injectable()
export class EventCategoryService {
  constructor(
    @Inject(EVENT_CATEGORY_REPOSITORY)
    private eventCategoryRepository: IEventCategoryRepository,

    private mapper: EventCategoryMapper,
  ) {}

  async create(
    userId: string,
    dto: CreateEventCategoryRequestDto,
  ): Promise<EventCategoryResponseDto> {
    const eventCategory = this.eventCategoryRepository.create({
      ...dto,
      user: { id: userId },
    });
    const newUserCategory = await this.eventCategoryRepository.save(
      eventCategory,
    );

    return this.mapper.toDtoEventCategoryResponse(newUserCategory);
  }

  async findAll(userId: string): Promise<EventCategoryResponseDto[]> {
    const eventCategories = await this.eventCategoryRepository.find({
      where: { user: { id: userId } },
    });

    return this.mapper.toDtoEventCategoryResponseList(eventCategories);
  }

  async findOne(id: string, userId: string): Promise<EventCategoryResponseDto> {
    const eventCategory = await this.eventCategoryRepository.expectOne(
      id,
      userId,
    );

    return this.mapper.toDtoEventCategoryResponse(eventCategory);
  }

  async update(
    id: string,
    dto: UpdateEventCategoryRequestDto,
    userId: string,
  ): Promise<EventCategoryResponseDto> {
    const eventCategory = await this.eventCategoryRepository.expectOne(
      id,
      userId,
    );

    const obj = { ...eventCategory, ...dto };

    const updatedEventCategory = await this.eventCategoryRepository.save(obj);

    return this.mapper.toDtoEventCategoryResponse(updatedEventCategory);
  }

  async remove(id: string, userId: string) {
    await this.eventCategoryRepository.expectOne(id, userId);

    return await this.eventCategoryRepository.delete({
      id,
      user: { id: userId },
    });
  }
}
