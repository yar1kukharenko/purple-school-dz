import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomSchema } from './room.model/room.model';
import { RoomService } from './room.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: RoomModel.name,
				schema: RoomSchema,
			},
		]),
	],
	controllers: [RoomController],
	providers: [RoomService],
	exports: [MongooseModule],
})
export class RoomModule {}
