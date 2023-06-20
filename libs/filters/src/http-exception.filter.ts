import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const statusCode = exception.getStatus();
		const errors = exception.getResponse();
		const exceptionName = exception.name;

		if (exceptionName === 'BadRequestException') {
			return response.status(400).json({
				statusCode: 400,
				success: false,
				errors
			});
		}

		return response.status(statusCode).json({
			statusCode,
			success: false,
			errors: {
				message: errors['message']
			}
		});
	}
}
