import { HttpStatus, NotFoundException } from "@nestjs/common";
import { NoteNotFound } from "src/messages";

export class NoteNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: NoteNotFound,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
