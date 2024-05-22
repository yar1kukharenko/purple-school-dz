import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema({ timestamps: true })
export class RoomModel {
	@Prop({ required: true })
	description: string;
	@Prop({ required: true })
	floor: number;
	@Prop({ required: true })
	approach: number;
	@Prop({ type: () => [String], required: true })
	photos: string[];
	@Prop({ required: false, default: null })
	deletedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel);
