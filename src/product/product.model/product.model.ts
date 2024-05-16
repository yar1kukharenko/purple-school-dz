import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class ProductCharacteristic {
	@Prop()
	name: string;
	@Prop()
	value: string;
}

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema({ timestamps: true })
export class ProductModel {
	@Prop()
	image: string;
	@Prop()
	title: string;
	@Prop()
	price: number;
	@Prop()
	oldPrice: number;
	@Prop()
	credit: number;
	@Prop()
	calculatedRating: number;
	@Prop()
	description: string;
	@Prop()
	advantages: string;
	@Prop()
	disAdvantages: string;
	@Prop({ type: () => [String] })
	categories: string[];
	@Prop({ type: () => [String] })
	tags: string[];
	@Prop({ type: () => [ProductCharacteristic], _id: false })
	characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
