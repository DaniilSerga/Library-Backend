import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

export class EmployeePositionDto {
	@ApiProperty({
		type: 'string',
		example: 'c5e141c4-4c86-4b82-9a6b-4ca620075028',
		required: true,
	})
	@IsUUID('4', {message: 'Employee id must be in UUID format'})
	employeeId: string;

	@ApiProperty({
		type: 'string',
		example: 'c5e141c4-4c86-4b82-9a6b-4ca620075028',
		required: true,
	})
	@IsUUID('4', {message: 'Position id must be in UUID format'})
	positionId: string;
}
