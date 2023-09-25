import { PartialType } from "@nestjs/swagger";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";

export class UpdateEventCategoryRequestDto extends PartialType(
  CreateEventCategoryRequestDto,
) {}
