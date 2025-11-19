import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EmployeeEntity} from './entities/employee.entity';
import {EmployeeDto} from './dto/employee.dto';
import {PositionService} from 'src/position/position.service';
import {EmployeePositionDto} from './dto/employee-position.dto';

@Injectable()
export class EmployeeService {
	constructor(
		@InjectRepository(EmployeeEntity)
		private readonly employeeRepository: Repository<EmployeeEntity>,
		private readonly positionService: PositionService,
	) {}

	async getAll() {
		return await this.employeeRepository.find({
			relations: {assignedBooks: true, position: true},
		});
	}

	async getById(id: string) {
		const employee = await this.employeeRepository.findOne({
			where: {id: id},
		});

		if (!employee) {
			throw new NotFoundException('No such employee');
		}

		return employee;
	}

	async getEmployeesByPosition(positionId: string) {
		const position = await this.positionService.getById(positionId);

		const employees = await this.employeeRepository.find({
			where: {positionId: position.id},
			select: {
				id: true,
				name: true,
				email: true,
			},
			relations: {
				position: true,
				assignedBooks: true,
			},
		});

		if (!employees || employees.length === 0) {
			throw new NotFoundException('No employees with such position');
		}

		return employees;
	}

	async setPosition(dto: EmployeePositionDto) {
		const {employeeId, positionId} = dto;

		const employee = await this.getById(employeeId);

		const position = await this.positionService.getById(positionId);

		employee.position = position;

		await this.employeeRepository.save(employee);

		return employee;
	}

	async create(dto: EmployeeDto): Promise<EmployeeEntity> {
		const {positionId} = dto;

		const position = await this.positionService.getById(positionId);

		const employee = this.employeeRepository.create({
			...dto,
			position: position,
		});

		return await this.employeeRepository.save(employee);
	}

	async delete(id: string): Promise<boolean> {
		const employee = await this.getById(id);

		await this.employeeRepository.remove(employee);

		return true;
	}

	async update(id: string, dto: EmployeeDto): Promise<EmployeeEntity> {
		const employee = await this.getById(id);

		Object.assign(employee, dto);

		return await this.employeeRepository.save(employee);
	}
}
