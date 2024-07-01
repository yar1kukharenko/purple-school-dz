import { IsString } from 'class-validator';
import { DATE_MUST_BE_STRING } from '../schedule.constants';

export class UpdateScheduleDto {
	@IsString({ message: DATE_MUST_BE_STRING })
	date?: string;
}
