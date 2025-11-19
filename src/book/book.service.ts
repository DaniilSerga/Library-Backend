import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BookEntity} from './entities/book.entity';
import {Repository} from 'typeorm';
import {BookDto} from './dto/book.dto';
import {EmployeeService} from 'src/employee/employee.service';
import {BookAssignmentDto} from './dto/book-assignment.dto';
import {EmployeeEntity} from 'src/employee/entities/employee.entity';

@Injectable()
export class BookService {
	constructor(
		@InjectRepository(BookEntity)
		private readonly booksRepository: Repository<BookEntity>,
		@InjectRepository(EmployeeEntity)
		private readonly employeeRepository: Repository<EmployeeEntity>,
		private readonly employeeService: EmployeeService,
	) {}

	async getAll(): Promise<BookEntity[]> {
		return await this.booksRepository.find();
	}

	async getById(id: string): Promise<BookEntity> {
		const book = await this.booksRepository.findOne({
			where: {id: id},
			relations: {assignedEmployee: true},
		});

		if (!book) {
			throw new NotFoundException('The book was not found');
		}

		return book;
	}

	async create(dto: BookDto): Promise<BookEntity> {
		const {employeeId} = dto;

		const employee = await this.employeeService.getById(employeeId);

		const book = this.booksRepository.create({
			...dto,
			assignedEmployee: employee,
		});

		return await this.booksRepository.save(book);
	}

	async assignBook(dto: BookAssignmentDto): Promise<BookEntity> {
		const {bookId, employeeId} = dto;

		const employee = await this.employeeService.getById(employeeId);

		const book = await this.getById(bookId);

		if (book.assignedEmployee.id === employee.id) {
			throw new ForbiddenException(
				'The book is already assigned to this employee',
			);
		}

		book.assignedEmployee = employee;

		const updatedBook = this.booksRepository.create(book);

		return await this.booksRepository.save(updatedBook);
	}

	async delete(id: string): Promise<string> {
		const book = await this.getById(id);

		await this.booksRepository.remove(book);

		return book.id;
	}

	async update(id: string, dto: BookDto): Promise<BookEntity> {
		const book = await this.getById(id);

		Object.assign(book, dto);

		return await this.booksRepository.save(book);
	}
}
