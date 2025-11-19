import {EmployeeEntity} from 'src/employee/entities/employee.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class BookEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({type: 'varchar'})
	title: string;

	@Column({type: 'text'})
	description: string;

	@Column({type: 'int', name: 'release_year'})
	releaseYear: number;

	// TODO: author

	@Column({name: 'employee_id', type: 'uuid', nullable: true})
	employeeId: string;

	@ManyToOne(() => EmployeeEntity, (employee) => employee.assignedBooks, {
		onDelete: 'SET NULL',
	})
	@JoinColumn({name: 'employee_id'})
	assignedEmployee: EmployeeEntity;
}
