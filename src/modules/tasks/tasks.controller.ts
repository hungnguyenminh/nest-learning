import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseHelper } from '@/helpers/responseHelper';
import { Response } from 'express';
import { PaginationDto } from '@/helpers/paginationDto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly response: ResponseHelper,
  ) {}

  // @Get()
  // async findAll(@Res() res: Response) {
  //   const findAllTask = await this.tasksService.findAll();
  //
  //   return this.response.responseSuccess(res, findAllTask);
  // }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Res() res: Response) {
    const findAllTask = await this.tasksService.findAll(paginationDto);

    return this.response.responseSuccess(res, findAllTask);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const findTask = await this.tasksService.findOne(id);

    return this.response.responseSuccess(res, findTask);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const taskCreated = await this.tasksService.create(createTaskDto);

    return this.response.responseSuccess(res, taskCreated);
  }

  @Post()
  async addUserToTask(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: Response,
  ) {
    const taskCreated = await this.tasksService.create(createTaskDto);

    return this.response.responseSuccess(res, taskCreated);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ) {
    const updateTask = await this.tasksService.update(id, updateTaskDto);

    return this.response.responseSuccess(res, updateTask);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const deleteTask = await this.tasksService.remove(id);

    return this.response.responseSuccess(res, deleteTask);
  }
}
