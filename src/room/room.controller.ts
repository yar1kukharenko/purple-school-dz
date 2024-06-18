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
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { ROOM_NOT_FOUND } from './room.constants';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateRoomDto) {
		return await this.roomService.create(dto);
	}

	@Get('getAll')
	async getAll(@Query('page') page: number, @Query('limit') limit: number) {
		return await this.roomService.findAll(page, limit);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const room = await this.roomService.findRoomById(id);
		if (!room) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return room;
		}
	}

	@Delete('hardDelete/:id')
	async delete(@Param('id') id: string) {
		const deletedRoom = await this.roomService.delete(id);
		if (!deletedRoom) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return deletedRoom;
		}
	}

	@Delete(':id')
	async softDelete(@Param('id') id: string) {
		const deletedSchedule = await this.roomService.softDelete(id);
		if (!deletedSchedule) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
		const updatedRoom = await this.roomService.update(id, dto);
		if (!updatedRoom) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		} else {
			return updatedRoom;
		}
	}
}
