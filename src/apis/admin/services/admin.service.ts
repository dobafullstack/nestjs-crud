import { BaseService } from '@app/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';

@Injectable()
export class AdminService extends BaseService<AdminEntity> {
	name = 'Admin';

	constructor(
		@InjectRepository(AdminEntity)
		private readonly adminRepo: Repository<AdminEntity>
	) {
		super(adminRepo);
	}
}
