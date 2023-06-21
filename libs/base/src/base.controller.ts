/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from './base.dto';
import { BaseModel } from './base.model';
import { BaseService } from './base.service';
import { ApiCreate, ApiDelete, ApiGetAll, ApiGetDetail, ApiUpdate } from './base.swagger';

export function BaseController<Model extends BaseModel>($ref: any, name?: string) {
	abstract class Controller {
		abstract relations: string[];

		constructor(public readonly service: BaseService<Model>) {}

		@Post('create')
		@ApiCreate($ref, name)
		create(@Body() body): Promise<Model> {
			return this.service.create(body);
		}

		@Get('all')
		@ApiGetAll($ref, name)
		getAll(@Query() query: PaginationDto): Promise<[Model[], number]> {
			return this.service.getAllWithPagination(
				query,
				{},
				//@ts-ignore
				{ createdAt: 'DESC' },
				...this.relations
			);
		}

		@Get('detail/:id')
		@ApiGetDetail($ref, name)
		getDetail(@Param('id') id: string): Promise<Model> {
			return this.service.getOneByIdOrFail(id, ...this.relations);
		}

		@Patch('update/:id')
		@ApiUpdate($ref, name)
		update(@Param('id') id: string, @Body() body) {
			return this.service.updateById(id, body);
		}

		@Delete('delete/:id')
		@ApiDelete($ref, name)
		delete(@Param('id') id: string) {
			return this.service.softDeleteById(id);
		}
	}

	return Controller;
}
