import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {getTypeOrmConfig} from './config/typeorm.config';
import {EmployeeModule} from './employee/employee.module';
import {BookModule} from './book/book.module';
import {PositionModule} from './position/position.module';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getTypeOrmConfig,
			inject: [ConfigService],
		}),
		EmployeeModule,
		BookModule,
		PositionModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
