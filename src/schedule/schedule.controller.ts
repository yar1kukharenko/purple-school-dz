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
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SCHEDULE_NOT_FOUND } from './schedule.constants';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateScheduleDto) {
		return await this.scheduleService.create(dto);
	}

	@Get('getByRoom/:roomId')
	async findByRoom(@Param('roomId') roomId: string) {
		const schedule = await this.scheduleService.findByRoomId(roomId);
		if (!schedule) {
			console.log('Schedule not found');
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return schedule;
		}
	}

	@Get('getAll')
	async getAll(@Query('page') page: number, @Query('limit') limit: number) {
		return await this.scheduleService.findAll(page, limit);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const schedule = await this.scheduleService.get(id);
		if (!schedule) {
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return schedule;
		}
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

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
		const updatedSchedule = await this.scheduleService.update(id, dto);
		if (!updatedSchedule) {
			throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return updatedSchedule;
		}
	}
}
