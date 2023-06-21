import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const uri = configService.get<string>('MONGO_URL');
				console.log(uri);
				return { uri };
			}
		})
	]
})
export class DatabaseModule {}
