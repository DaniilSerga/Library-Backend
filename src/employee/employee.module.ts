import {Module} from '@nestjs/common';
import {EmployeeService} from './employee.service';
import {EmployeeController} from './employee.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeeEntity} from './entities/employee.entity';
import {PositionEntity} from '../position/entities/position.entity';
import {PositionService} from 'src/position/position.service';
import {BookEntity} from 'src/book/entities/book.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([EmployeeEntity, PositionEntity, BookEntity]),
	],
	controllers: [EmployeeController],
	providers: [EmployeeService, PositionService],
})
export class EmployeeModule {}
