import {
	BadRequestException,
	ClassSerializerInterceptor,
	Provider,
	ValidationError,
	ValidationPipe
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { TypeormExceptionFilter } from 'src/common/filters/typeorm-exception.filter';
import { ResponseTransformInterceptor } from 'src/common/interceptors/response-transform.interceptor';
import { AppService } from './app.service';

const exceptionFactory = (errors: ValidationError[]) => {
	throw new BadRequestException(
		errors.reduce((prev, next) => {
			const err = validationErrors(next);

			return {
				...prev,
				...err
			};
		}, {})
	);
};

const validationErrors = (err: ValidationError) => {
	if (!err.constraints && err.children && err.children.length > 0) {
		return validationErrors(err.children[0]);
	}

	return {
		[err.property]: err.constraints ? Object.values(err.constraints)[0] : ''
	};
};

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
	},
	{
		provide: APP_PIPE,
		useValue: new ValidationPipe({
			exceptionFactory
		})
	}
];
