import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";
import { UpdateEventCategoryRequestDto } from "src/event_category/dto/request/update-event_category.request-dto";
import { EventCategoryResponseDto } from "src/event_category/dto/response/event_category.response-dto";
import { EventCategoryMapper } from "src/event_category/event_category.mapper";
import { IEventCategoryRepository } from "src/event_category/event_category.repository";
import { EventCategoryNotFoundException } from "src/exceptions/event_category.exceptions";
import {
  EVENT_CATEGORY_REPOSITORY,
  USERS_REPOSITORY,
} from "src/utils/constants";
import { Repository } from "typeorm";
import { isNullOrUndefined } from "../utils/helpers";

@Injectable()
export class EventCategoryService {
  constructor(
    @Inject(EVENT_CATEGORY_REPOSITORY)
    private eventCategoryRepository: IEventCategoryRepository,

    @Inject(USERS_REPOSITORY)
    private userRepository: Repository<User>,

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

    const newEventCategory = { ...eventCategory, ...dto };

    const updatedEventCategory = await this.eventCategoryRepository.save(
      newEventCategory,
    );

    return this.mapper.toDtoEventCategoryResponse(updatedEventCategory);
  }

  async remove(id: string, userId: string) {
    const eventCategory = await this.eventCategoryRepository.expectOne(
      id,
      userId,
    );

    if (isNullOrUndefined(eventCategory))
      throw new EventCategoryNotFoundException();

    return await this.eventCategoryRepository.delete({
      id,
      user: { id: userId },
    });
  }
}
