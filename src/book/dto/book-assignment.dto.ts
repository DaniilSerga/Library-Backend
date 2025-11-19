import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

export class BookAssignmentDto {
	@ApiProperty({
		example: '587c406e-fb94-47f6-8465-ae293a7c9e8b',
		type: 'string',
		required: true,
	})
	@IsUUID('4', {message: 'Book id must be in uuid format'})
	bookId: string;

	@ApiProperty({
		example: '587c406e-fb94-47f6-8465-ae293a7c9e8b',
		type: 'string',
		required: true,
	})
	@IsUUID('4', {message: 'Employee id must be in uuid format'})
	employeeId: string;
}
