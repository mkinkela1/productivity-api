import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt-auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { TUser } from "src/entities/user.entity";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";
import { UpdateEventCategoryRequestDto } from "src/event_category/dto/request/update-event_category.request-dto";
import { EventCategoryResponseDto } from "src/event_category/dto/response/event_category.response-dto";
import { EventCategoryService } from "src/event_category/event_category.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("events")
@Controller("event-category")
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @Post()
  @ApiCreatedResponse({ type: EventCategoryResponseDto })
  create(
    @CurrentUser() user: TUser,
    @Body() createEventCategoryDto: CreateEventCategoryRequestDto,
  ): Promise<EventCategoryResponseDto> {
    return this.eventCategoryService.create(user.id, createEventCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    type: EventCategoryResponseDto,
    isArray: true,
  })
  findAll(@CurrentUser() user: TUser): Promise<EventCategoryResponseDto[]> {
    return this.eventCategoryService.findAll(user.id);
  }

  @ApiOkResponse({
    type: EventCategoryResponseDto,
  })
  @ApiNotFoundResponse()
  @Get(":id")
  findOne(@Param("id") id: string, @CurrentUser() user: TUser) {
    return this.eventCategoryService.findOne(id, user.id);
  }

  @ApiOkResponse({
    type: EventCategoryResponseDto,
  })
  @ApiNotFoundResponse()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryRequestDto,
    @CurrentUser() user: TUser,
  ): Promise<EventCategoryResponseDto> {
    return this.eventCategoryService.update(
      id,
      updateEventCategoryDto,
      user.id,
    );
  }

  @ApiNotFoundResponse()
  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string, @CurrentUser() user: TUser) {
    return this.eventCategoryService.remove(id, user.id);
  }
}
