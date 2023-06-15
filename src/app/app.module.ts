import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from 'src/apis/api.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { DatabaseModule } from 'src/database/database.module';
import { JWTModule } from 'src/jwt/jwt.module';
import { PassportModule } from 'src/passport/passport.module';
import { RedisModule } from 'src/redis/redis.module';
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
		PassportModule,
		CryptoModule,
		ApiModule
	],
	controllers: [AppController],
	providers: [AppService, ...providers]
})
export class AppModule {}
