import { HttpStatus, NotFoundException } from "@nestjs/common";
import { EventCategoryNotFound } from "src/messages";

export class EventCategoryNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: EventCategoryNotFound,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
