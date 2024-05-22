import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SCHEDULE_NOT_FOUND } from './schedule.constants';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post('create')
	async create(@Body() dto: CreateScheduleDto) {
		return await this.scheduleService.create(dto);
	}

	@Get('getByRoom/:roomId')
	async findByRoom(@Param('roomId') roomId: string) {
		return await this.scheduleService.findByRoomId(roomId);
	}

	@Get('getAll')
	async getAll() {
		return await this.scheduleService.findAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return await this.scheduleService.get(id);
	}

	@Delete('deleteByRoom/:roomId')
	async deleteByRoom(@Param('roomId') roomId: string) {
		const deletedSchedule = await this.scheduleService.deleteByRoomId(roomId);
		if (!deletedSchedule) {
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Delete(':id')
	async softDelete(@Param('id') id: string) {
		const deletedSchedule = await this.scheduleService.softDelete(id);
		if (!deletedSchedule) {
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Delete('hardDelete/:id')
	async delete(@Param('id') id: string) {
		const deletedSchedule = await this.scheduleService.delete(id);
		if (!deletedSchedule) {
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
		const updatedSchedule = await this.scheduleService.update(id, dto);
		if (!updatedSchedule) {
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
