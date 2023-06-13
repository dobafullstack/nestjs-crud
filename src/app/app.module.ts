import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { DatabaseModule } from 'src/database/database.module';
import { JWTModule } from 'src/jwt/jwt.module';
import { PassportModule } from 'src/passport/passport.module';
import { RedisModule } from 'src/redis/redis.module';
import { AppController } from './app.controller';
import { providers } from './app.provider';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production'
		}),
		DatabaseModule,
		JWTModule,
		RedisModule,
		PassportModule
	],
	controllers: [AppController],
	providers
})
export class AppModule {}
