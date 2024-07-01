import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleDocument, ScheduleModel } from './schedule.model/schedule.model';
import { Model, Types } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SCHEDULE_ALREADY_EXISTS } from './schedule.constants';
import { RoomDocument, RoomModel } from '../room/room.model/room.model';
import { ROOM_NOT_FOUND } from '../room/room.constants';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(ScheduleModel.name)
		private readonly scheduleModel: Model<ScheduleDocument>,
		@InjectModel(RoomModel.name)
		private readonly roomModel: Model<RoomDocument>,
	) {}

	async create(dto: CreateScheduleDto): Promise<ScheduleDocument> {
		const existingSchedule = await this.scheduleModel
			.findOne({
				roomId: dto.roomId,
				date: dto.date,
			})
			.exec();
		const existingRoom = await this.roomModel.findById(dto.roomId).exec();
		if (existingSchedule) {
			throw new HttpException(SCHEDULE_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
		}
		if (!existingRoom) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return this.scheduleModel.create(dto);
	}

	async get(id: string) {
		return this.scheduleModel.findById(id).exec();
	}

	async delete(id: string): Promise<ScheduleDocument> | null {
		return this.scheduleModel.findByIdAndDelete(id).exec();
	}

	async deleteByRoomId(roomId: string) {
		return this.scheduleModel.deleteMany({ roomId: new Types.ObjectId(roomId) }).exec();
	}

	async findByRoomId(roomId: string) {
		return this.scheduleModel.find({ roomId: new Types.ObjectId(roomId) }).exec();
	}

	async findAll(page: number = 1, limit: number = 10) {
		const skip = (page - 1) * limit;
		return this.scheduleModel.find().skip(skip).limit(limit).exec();
	}

	async update(id: string, updatedScheduleDto: UpdateScheduleDto) {
		return this.scheduleModel.findByIdAndUpdate(id, updatedScheduleDto, {
			new: true,
		});
	}

	async softDelete(id: string): Promise<ScheduleDocument> {
		return this.scheduleModel
			.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
			.exec();
	}
}
