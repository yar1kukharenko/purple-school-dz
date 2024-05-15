import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ScheduleModel } from './schedule.model/schedule.model';

@Controller('schedule')
export class ScheduleController {
	@Post()
	async create(@Body() dto: ScheduleModel) {}

	@Get()
	async findByRoom(@Param('roomId') roomId: number) {}

	@Delete()
	async delete(@Param('roomId') roomId: number) {}
}
