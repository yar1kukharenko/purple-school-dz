import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomModel } from './room.model/room.model';

@Controller('room')
export class RoomController {
	@Post('create')
	async create(@Body() dto: Omit<RoomModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: RoomModel) {}
}
