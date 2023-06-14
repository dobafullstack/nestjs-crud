import { Pagination } from './pagination.interface';

export interface FormatResponse {
	statusCode: number;
	success: boolean;
	data: any;
	metadata?: Pagination;
}
