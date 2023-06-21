import { ApiCreate, ApiGetDetail, ApiUpdate, BaseController } from '@app/base';
import { AuthAdmin } from '@app/decorators';
import { User } from '@app/decorators/user.decorator';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminModel } from '../models/admin.model';
import { AdminService } from '../services/admin.service';

@Controller('admin')
@ApiTags('Admin API')
@AuthAdmin()
export class AdminController extends BaseController<AdminModel>(AdminModel, 'admin') {
	relations = [];

	constructor(private readonly adminService: AdminService) {
		super(adminService);
	}

	@Post('create')
	@ApiCreate(AdminModel, 'admin')
	create(@Body() body: CreateAdminDto) {
		return super.create(body);
	}
	@Patch('update/:id')
	@ApiUpdate(AdminModel, 'admin')
	update(@Param('id') id: string, @Body() body: UpdateAdminDto) {
		return super.update(id, body);
	}

	@Get('me')
	@ApiGetDetail(AdminModel, 'admin')
	getMe(@User() user: AdminModel) {
		return user;
	}
}
