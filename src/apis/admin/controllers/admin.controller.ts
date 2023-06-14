import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base/base.controller';
import { ApiCreate, ApiGetDetail, ApiUpdate } from 'src/common/base/base.swagger';
import { AuthAdmin } from 'src/common/decorators/auth-admin.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminService } from '../services/admin.service';
import { AdminEntity } from './../entities/admin.entity';

@Controller('admin')
@ApiTags('Admin API')
@AuthAdmin()
export class AdminController extends BaseController<AdminEntity>(AdminEntity, 'admin') {
	relations = [];

	constructor(private readonly adminService: AdminService) {
		super(adminService);
	}

	@Post('create')
	@ApiCreate(AdminEntity, 'admin')
	create(@Body() body: CreateAdminDto): Promise<AdminEntity> {
		return super.create(body);
	}
	@Patch('update/:id')
	@ApiUpdate(AdminEntity, 'admin')
	update(@Param('id') id: string, @Body() body: UpdateAdminDto): Promise<AdminEntity> {
		return super.update(id, body);
	}

	@Get('me')
	@ApiGetDetail(AdminEntity, 'admin')
	getMe(@User() user: AdminEntity) {
		return user;
	}
}
