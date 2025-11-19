import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PositionService} from './position.service';
import {PositionDto} from './dto/position.dto';

@Controller('positions')
export class PositionController {
	constructor(private readonly positionService: PositionService) {}

	@Get()
	getAllPositions() {
		return this.positionService.get();
	}

	@Get(':id')
	getPositionById(@Param('id') id: string) {
		return this.positionService.getById(id);
	}

	@Post()
	createPosition(@Body() dto: PositionDto) {
		return this.positionService.create(dto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.positionService.delete(id);
	}

	@Put(':id')
	updatePosition(@Param() id: string, @Body() dto: PositionDto) {
		return this.positionService.update(id, dto);
	}
}
