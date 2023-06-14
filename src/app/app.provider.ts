import { ClassSerializerInterceptor, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { TypeormExceptionFilter } from 'src/common/filters/typeorm-exception.filter';
import { ResponseTransformInterceptor } from 'src/common/interceptors/response-transform.interceptor';
import { AppService } from './app.service';

export const providers: Provider[] = [
	AppService,
	{
		provide: APP_FILTER,
		useClass: HttpExceptionFilter
	},
	{
		provide: APP_FILTER,
		useClass: TypeormExceptionFilter
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: ResponseTransformInterceptor
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: ClassSerializerInterceptor
	}
];
