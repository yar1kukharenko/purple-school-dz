import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleDocument, ScheduleModel } from './schedule.model/schedule.model';
import { Model, Types } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(ScheduleModel.name)
		private readonly scheduleModel: Model<ScheduleDocument>,
	) {}

	async create(dto: CreateScheduleDto): Promise<ScheduleDocument> {
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
}
