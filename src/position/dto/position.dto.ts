import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsString, Min} from 'class-validator';

export class PositionDto {
	@ApiProperty({type: 'string', example: 'string'})
	@IsString({message: 'Position name must be in string format'})
	@IsNotEmpty({message: 'Position name must not be empty'})
	position: string;

	@ApiProperty({type: 'number', example: 0})
	@IsInt({message: 'Limit of books must be an integer value'})
	@Min(0, {message: 'Limit must be greater than 0'})
	booksLimit: number;
}
