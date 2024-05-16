import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@Prop()
	count: number;
	@Prop()
	juniorSalary: number;
	@Prop()
	middleSalary: number;
	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;
	@Prop()
	description: string;
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory, type: () => Number })
	firstCategory: TopLevelCategory;
	@Prop()
	secondCategory: string;
	@Prop({ unique: true })
	alias: string;
	@Prop()
	title: string;
	@Prop()
	category: string;
	@Prop()
	hh?: HhData;
	@Prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];
	@Prop()
	seoText: string;
	@Prop()
	tagsTitle: string;
	@Prop({ type: () => [String] })
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
