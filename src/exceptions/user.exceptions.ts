import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { EmailAlreadyExists, UserNotFound } from "src/messages";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: UserNotFound,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super({
      message: EmailAlreadyExists,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
