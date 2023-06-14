import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';
import { FormatResponse } from '../interfaces/format-response.interface';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<FormatResponse> {
		const http = context.switchToHttp();
		const response = http.getResponse<Response>();
		const request = http.getRequest<Request>();
		const statusCode = response.statusCode;

		return next.handle().pipe(
			map((data) => {
				if (isPagination(data)) {
					return {
						statusCode,
						success: true,
						data: data[0],
						metadata: getMetadata(request, data)
					};
				}

				return {
					statusCode,
					success: true,
					data
				};
			})
		);
	}
}

const isPagination = (data: any): boolean => {
	if (!Array.isArray(data)) return false;
	if (data.length !== 2) return false;
	const [entities, count] = data;
	if (!Array.isArray(entities)) return false;
	if (typeof count !== 'number') return false;

	return true;
};

const getMetadata = (req: Request, data: any[]) => {
	const { page: pageQuery, limit: limitQuery } = req.query;
	const page = pageQuery ? +pageQuery : 1;
	const limit = limitQuery ? +limitQuery : 10;
	const totalItems = data[1];
	const totalPages = Math.ceil(data[1] / +limit);

	return {
		page,
		limit,
		totalItems,
		totalPages
	};
};
