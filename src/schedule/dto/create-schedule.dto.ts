import { DATE_MUST_BE_STRING, ROOM_ID_MUST_BE_STRING } from '../schedule.constants';
import { IsString } from 'class-validator';

export class CreateScheduleDto {
	@IsString({ message: ROOM_ID_MUST_BE_STRING })
	roomId: string;

	@IsString({ message: DATE_MUST_BE_STRING })
	date: string;
	_id: string;
}
