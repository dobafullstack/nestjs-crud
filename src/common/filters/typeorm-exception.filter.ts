import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormExceptionFilter<T> implements ExceptionFilter {
	catch(exception: TypeORMError, host: ArgumentsHost) {
		console.log(exception);
	}
}
