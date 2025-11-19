import {Module} from '@nestjs/common';
import {BookService} from './book.service';
import {BookController} from './book.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BookEntity} from './entities/book.entity';
import {EmployeeService} from 'src/employee/employee.service';
import {EmployeeEntity} from 'src/employee/entities/employee.entity';
import {PositionEntity} from 'src/position/entities/position.entity';
import {PositionService} from 'src/position/position.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([BookEntity, EmployeeEntity, PositionEntity]),
	],
	controllers: [BookController],
	providers: [BookService, EmployeeService, PositionService],
})
export class BookModule {}
