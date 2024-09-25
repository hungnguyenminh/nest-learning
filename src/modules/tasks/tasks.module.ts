import { Module } from '@nestjs/common';
import { TasksService } from '@/modules/tasks/tasks.service';
import { TasksController } from '@/modules/tasks/tasks.controller';
import { ResponseHelper } from '@/helpers/responseHelper';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ResponseHelper],
})
export class TasksModule {}
