import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleDocument, ScheduleModel } from './schedule.model/schedule.model';
import { Model, Types } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SCHEDULE_ALREADY_EXISTS } from './schedule.constants';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(ScheduleModel.name)
		private readonly scheduleModel: Model<ScheduleDocument>,
	) {}

	async create(dto: CreateScheduleDto): Promise<ScheduleDocument> {
		const existingSchedule = await this.scheduleModel
			.findOne({
				roomId: dto.roomId,
				date: dto.date,
			})
			.exec();
		if (existingSchedule) {
			throw new HttpException(SCHEDULE_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
		}
		return this.scheduleModel.create(dto);
	}

	async get(id: string): Promise<ScheduleDocument> {
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

	async findAll() {
		return this.scheduleModel.find().exec();
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
