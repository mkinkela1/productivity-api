import { Inject, Injectable } from "@nestjs/common";
import { EventCategory } from "src/entities/event_category.entity";
import { User } from "src/entities/user.entity";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";
import { UpdateEventCategoryRequestDto } from "src/event_category/dto/request/update-event_category.request-dto";
import {
  EVENT_CATEGORY_REPOSITORY,
  USERS_REPOSITORY,
} from "src/utils/constants";
import { Repository } from "typeorm";

@Injectable()
export class EventCategoryService {
  constructor(
    @Inject(EVENT_CATEGORY_REPOSITORY)
    private eventCategoryRepository: Repository<EventCategory>,

    @Inject(USERS_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, dto: CreateEventCategoryRequestDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const eventCategory = this.eventCategoryRepository.create({
      ...dto,
      user,
    });
    return await this.eventCategoryRepository.save(eventCategory);
  }

  findAll() {
    return `This action returns all eventCategory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} eventCategory`;
  }

  update(id: string, dto: UpdateEventCategoryRequestDto) {
    return `This action updates a #${id} eventCategory`;
  }

  remove(id: string) {
    return `This action removes a #${id} eventCategory`;
  }
}
