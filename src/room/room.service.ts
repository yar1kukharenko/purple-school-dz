import { Injectable } from '@nestjs/common';
import { RoomDocument, RoomModel } from './room.model/room.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
	constructor(
		@InjectModel(RoomModel.name)
		private readonly roomModel: Model<RoomDocument>,
	) {}

	async create(dto: CreateRoomDto) {
		return this.roomModel.create(dto);
	}

	async delete(id: string): Promise<RoomDocument> | null {
		return this.roomModel.findByIdAndDelete(id).exec();
	}

	async findRoomById(roomId: string): Promise<RoomDocument> {
		return this.roomModel.findById(roomId).exec();
	}

	async findAll(): Promise<RoomModel[]> {
		return this.roomModel.find().exec();
	}

	async update(roomId: string, updatedRoomDto: UpdateRoomDto): Promise<RoomDocument> {
		return this.roomModel.findByIdAndUpdate(roomId, updatedRoomDto, {
			new: true,
		});
	}

	async softDelete(id: string): Promise<RoomDocument> {
		return this.roomModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
	}
}
