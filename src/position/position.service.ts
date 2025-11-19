import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PositionEntity} from './entities/position.entity';
import {PositionDto} from './dto/position.dto';

@Injectable()
export class PositionService {
	constructor(
		@InjectRepository(PositionEntity)
		private readonly positionRepository: Repository<PositionEntity>,
	) {}

	async get(): Promise<PositionEntity[]> {
		return await this.positionRepository.find();
	}

	async getById(id: string) {
		const position = await this.positionRepository.findOne({
			where: {id: id},
		});

		if (!position) {
			throw new NotFoundException('No such position');
		}

		return position;
	}

	async create(dto: PositionDto): Promise<PositionEntity> {
		const positionExists = await this.positionRepository.existsBy({
			position: dto.position,
		});

		if (positionExists) {
			throw new ForbiddenException('Position already exists');
		}

		const position = this.positionRepository.create(dto);

		return await this.positionRepository.save(position);
	}

	async delete(id: string) {
		const position = await this.getById(id);

		await this.positionRepository.remove(position);

		return position.id;
	}

	async update(id: string, dto: PositionDto): Promise<PositionEntity> {
		const position = await this.getById(id);

		Object.assign(position, dto);

		return await this.positionRepository.save(position);
	}
}
