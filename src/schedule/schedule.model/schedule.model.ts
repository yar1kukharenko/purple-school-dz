import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomModel } from '../../room/room.model/room.model';

export type ScheduleDocument = HydratedDocument<ScheduleModel>;

@Schema({ timestamps: true })
export class ScheduleModel {
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: RoomModel.name })
	roomId: string;
	@Prop({ required: true, type: 'date' })
	date: Date;
	@Prop({ required: false, default: null })
	deletedAt: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleModel);
