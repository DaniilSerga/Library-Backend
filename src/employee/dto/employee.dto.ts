import {ApiProperty} from '@nestjs/swagger';
import {
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength,
} from 'class-validator';

export class EmployeeDto {
	@ApiProperty({
		example: 'John',
		required: true,
	})
	@IsString({message: "Employee's name must be in string format"})
	@IsNotEmpty({message: 'Name must not be empty'})
	@MinLength(3, {message: 'Name length must be at least 3 characters long'})
	name: string;

	@ApiProperty({
		example: 24,
		required: true,
	})
	@IsInt({message: 'Age must be an integer number'})
	@Min(18, {message: "Employee's age must be over 18"})
	@Max(130, {message: "Employey's age is too great"})
	age: number;

	@ApiProperty({
		example: 'rehmat.sayani@gmail.com',
		required: true,
	})
	@IsEmail(
		{
			allow_underscores: false,
			allow_ip_domain: false,
			allow_display_name: false,
		},
		{message: 'Wrong email format'},
	)
	@IsNotEmpty({message: 'Email field must not be empty'})
	email: string;

	@ApiProperty({
		example: '588342aa-9d75-4455-8721-5843c47be275',
		required: true,
	})
	@IsUUID('4', {message: 'Position id must be in uuid format'})
	positionId: string;
}
