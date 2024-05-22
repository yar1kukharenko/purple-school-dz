import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ScheduleDocument = HydratedDocument<ScheduleModel>;

@Schema({ timestamps: true })
export class ScheduleModel {
	@Prop({ required: true })
	roomId: number;
	@Prop({ required: true })
	date: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleModel);
