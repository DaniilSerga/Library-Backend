import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EmployeeEntity} from '../../employee/entities/employee.entity';

@Entity('positions')
export class PositionEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({type: 'varchar', unique: true})
	position: string;

	@Column({type: 'int', name: 'books_limit'})
	booksLimit: number;

	@OneToMany(() => EmployeeEntity, (employee) => employee.position)
	employees: EmployeeEntity[];
}
