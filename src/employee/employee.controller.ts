import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import {EmployeeService} from './employee.service';
import {EmployeeDto} from './dto/employee.dto';
import {EmployeePositionDto} from './dto/employee-position.dto';

@Controller('employees')
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Get()
	getAll() {
		return this.employeeService.getAll();
	}

	@Get('/:id')
	getById(@Param('id') id: string) {
		return this.employeeService.getById(id);
	}

	@Get('position/:positionId')
	getEmployeesByPosition(@Param('positionId') positionId: string) {
		return this.employeeService.getEmployeesByPosition(positionId);
	}

	@Post()
	create(@Body() dto: EmployeeDto) {
		return this.employeeService.create(dto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.employeeService.delete(id);
	}

	@Put(':id')
	update(@Param() id: string, @Body() dto: EmployeeDto) {
		return this.employeeService.update(id, dto);
	}

	@Patch('position')
	setPosition(@Body() dto: EmployeePositionDto) {
		return this.employeeService.setPosition(dto);
	}
}
