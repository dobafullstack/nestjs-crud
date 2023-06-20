import { CryptoModule } from '@app/crypto';
import { DatabaseModule } from '@app/database';
import { JWTModule } from '@app/jwt';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from 'src/apis/api.module';
import { AppController } from './app.controller';
import { providers } from './app.provider';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production'
		}),
		MulterModule.register({
			dest: './upload'
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', '..', 'uploads')
		}),
		DatabaseModule,
		JWTModule,
		RedisModule,
		CryptoModule,
		ApiModule
	],
	controllers: [AppController],
	providers: [AppService, ...providers]
})
export class AppModule {}
