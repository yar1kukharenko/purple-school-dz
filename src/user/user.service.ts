import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

	async getByEmail(email: string) {
		return this.userModel.findOne({ email });
	}

	async createUser({ email, password }: { email: string; password: string }) {
		const newUser = new this.userModel({ email, password });
		return newUser.save();
	}
}
