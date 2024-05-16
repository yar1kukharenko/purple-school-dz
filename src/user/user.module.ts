import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { UserService } from './user.service';
import { PostModel, PostSchema } from './models/post.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: UserModel.name,
				schema: UserSchema,
			},
			{
				name: PostModel.name,
				schema: PostSchema,
			},
		]),
	],
	providers: [UserService],
})
export class UserModule {}
