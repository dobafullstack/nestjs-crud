import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'ormconfig';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: () => ({
				...options,
				autoLoadEntities: true
			})
		})
	]
})
export class DatabaseModule {}
