import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { TRequestUser } from "src/entities/user.entity";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";
import { UpdateEventCategoryRequestDto } from "src/event_category/dto/request/update-event_category.request-dto";
import { EventCategoryService } from "src/event_category/event_category.service";

@ApiTags("events")
@Controller("event-category")
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() request: TRequestUser,
    @Body() createEventCategoryDto: CreateEventCategoryRequestDto,
  ) {
    return this.eventCategoryService.create(
      request.user.id,
      createEventCategoryDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.eventCategoryService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventCategoryService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryRequestDto,
  ) {
    return this.eventCategoryService.update(id, updateEventCategoryDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventCategoryService.remove(id);
  }
}
