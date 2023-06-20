import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {
	catch(exception: TypeORMError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		let statusCode = 500;
		const code = exception['code'];
		const message = exception['message'];
		const errors = {
			code,
			message
		};
		if (code === '23505') {
			errors['message'] = exception['detail'];
			statusCode = 409;
		}
		return response.status(statusCode).json({
			statusCode,
			success: false,
			errors
		});
	}
}
