import { BaseService } from '@app/base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminModel } from '../models/admin.model';

@Injectable()
export class AdminService extends BaseService<AdminModel> {
	name = 'Admin';

	constructor(
		@InjectModel(AdminModel.name)
		private readonly adminModel: Model<AdminModel>
	) {
		super(adminModel);
	}
}
