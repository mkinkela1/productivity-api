import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
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
import { TRequestUser } from "src/entities/user.entity";
import { CreateEventCategoryRequestDto } from "src/event_category/dto/request/create-event_category.request-dto";
import { UpdateEventCategoryRequestDto } from "src/event_category/dto/request/update-event_category.request-dto";
import { EventCategoryResponseDto } from "src/event_category/dto/response/event_category.response-dto";
import { EventCategoryService } from "src/event_category/event_category.service";

@ApiTags("events")
@Controller("event-category")
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: EventCategoryResponseDto })
  create(
    @Request() request: TRequestUser,
    @Body() createEventCategoryDto: CreateEventCategoryRequestDto,
  ): Promise<EventCategoryResponseDto> {
    return this.eventCategoryService.create(
      request.user.id,
      createEventCategoryDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    type: EventCategoryResponseDto,
    isArray: true,
  })
  findAll(
    @Request() request: TRequestUser,
  ): Promise<EventCategoryResponseDto[]> {
    return this.eventCategoryService.findAll(request.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: EventCategoryResponseDto,
  })
  @ApiNotFoundResponse()
  @Get(":id")
  findOne(@Param("id") id: string, @Request() request: TRequestUser) {
    return this.eventCategoryService.findOne(id, request.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: EventCategoryResponseDto,
  })
  @ApiNotFoundResponse()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryRequestDto,
    @Request() request: TRequestUser,
  ): Promise<EventCategoryResponseDto> {
    return this.eventCategoryService.update(
      id,
      updateEventCategoryDto,
      request.user.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse()
  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string, @Request() request: TRequestUser) {
    return this.eventCategoryService.remove(id, request.user.id);
  }
}
