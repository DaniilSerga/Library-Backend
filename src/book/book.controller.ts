import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {BookService} from './book.service';
import {BookDto} from './dto/book.dto';
import {BookAssignmentDto} from './dto/book-assignment.dto';

@Controller('books')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get()
	getAll() {
		return this.bookService.getAll();
	}

	@Get(':id')
	getById(@Param('id') id: string) {
		return this.bookService.getById(id);
	}

	@Post()
	create(@Body() dto: BookDto) {
		return this.bookService.create(dto);
	}

	@Post('assign')
	assignBook(@Body() dto: BookAssignmentDto) {
		return this.bookService.assignBook(dto);
	}

	@Delete()
	delete(@Body() id: string) {
		return this.bookService.delete(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: BookDto) {
		return this.bookService.update(id, dto);
	}
}
