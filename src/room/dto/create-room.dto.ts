import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';
import {
	APPROACH_MUST_BE_NUMBER,
	DESCRIPTION_MUST_BE_STRING,
	FLOOR_MUST_BE_NUMBER,
	PHOTOS_MUST_BE_ARRAY,
	PHOTOS_MUST_BE_ARRAY_OF_STRINGS,
	PHOTOS_MUST_BE_NON_EMPTY_ARRAY,
} from '../room.constants';

export class CreateRoomDto {
	@IsString({ message: DESCRIPTION_MUST_BE_STRING })
	description: string;

	@IsNumber({}, { message: FLOOR_MUST_BE_NUMBER })
	floor: number;

	@IsNumber({}, { message: APPROACH_MUST_BE_NUMBER })
	approach: number;

	@IsArray({ message: PHOTOS_MUST_BE_ARRAY })
	@ArrayNotEmpty({ message: PHOTOS_MUST_BE_NON_EMPTY_ARRAY })
	@IsString({ each: true, message: PHOTOS_MUST_BE_ARRAY_OF_STRINGS })
	photos: string[];
	_id: string;
}
