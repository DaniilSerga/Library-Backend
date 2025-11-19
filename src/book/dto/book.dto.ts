import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsString, IsUUID, Max, Min} from 'class-validator';

export class BookDto {
	@ApiProperty({example: 'Fight club', required: true, type: 'string'})
	@IsString({message: 'Description must be passed as a string value'})
	@IsNotEmpty({message: 'Description must not be empty'})
	title: string;

	@ApiProperty({
		example: 'Book description',
		required: true,
		type: 'string',
	})
	@IsString({message: 'Description must be passed as a string value'})
	@IsNotEmpty({message: 'Description must not be empty'})
	description: string;

	@ApiProperty({example: 1996, required: true, type: 'number'})
	@IsInt({message: 'Release year is an integer value'})
	@Min(100)
	@Max(new Date().getFullYear())
	releaseYear: number;

	// author: Author

	@ApiProperty({
		example: '588342aa-9d75-4455-8721-5843c47be275',
		required: true,
		type: 'string',
	})
	@IsUUID('4', {message: 'id must be passed in uuid format'})
	employeeId: string;
}
