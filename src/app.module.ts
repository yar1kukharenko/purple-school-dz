import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomModule } from './room/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: `${configService.get<string>('DB_HOST')}/${configService.get<string>('DB_NAME')}`,
				user: configService.get<string>('DB_USER'),
				pass: configService.get<string>('DB_PASS'),
				authSource: configService.get<string>('DB_AUTH'),
			}),
			inject: [ConfigService],
		}),
		ScheduleModule,
		RoomModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
