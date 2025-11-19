import {BookEntity} from 'src/book/entities/book.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import {PositionEntity} from '../../position/entities/position.entity';

export enum Positions {
	'Librarian',
	'Assistant',
	'Researcher',
	'Director',
}

@Entity('employees')
export class EmployeeEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({type: 'varchar'})
	name: string;

	@Column({type: 'varchar'})
	email: string;

	@Column({type: 'uuid', name: 'position_id', nullable: true})
	positionId: string;

	@ManyToOne(() => PositionEntity, (position) => position.id)
	@JoinColumn({name: 'position_id'})
	position: PositionEntity;

	@OneToMany(() => BookEntity, (book) => book.assignedEmployee)
	assignedBooks: BookEntity[];

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;
}
