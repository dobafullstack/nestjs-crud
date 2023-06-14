import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { ApiCreate, ApiDelete, ApiGetAll, ApiGetDetail, ApiUpdate } from './base.swagger';

export function BaseController<Entity extends BaseEntity>($ref: any, name?: string) {
	class Controller {
		constructor(public readonly service: BaseService<Entity>) {}

		@Post('create')
		@ApiCreate($ref, name)
		create(@Body() body): Promise<Entity> {
			return this.service.create(body);
		}

		@Get('all')
		@ApiGetAll($ref, name)
		getAll(): Promise<Entity[]> {
			return this.service.getAll();
		}

		@Get('detail/:id')
		@ApiGetDetail($ref, name)
		getDetail(@Param('id') id: string): Promise<Entity> {
			return this.service.getOneByIdOrFail(id);
		}

		@Patch('update/:id')
		@ApiUpdate($ref, name)
		update(@Param('id') id: string, @Body() body): Promise<Entity> {
			return this.service.updateById(id, body);
		}

		@Delete('delete/:id')
		@ApiDelete($ref, name)
		delete(@Param('id') id: string): Promise<Entity> {
			return this.service.softDeleteById(id);
		}
	}

	return Controller;
}
