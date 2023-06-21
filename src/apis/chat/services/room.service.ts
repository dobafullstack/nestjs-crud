import { BaseService } from '@app/base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminService } from 'src/apis/admin/services/admin.service';
import { CreateRoomDto } from '../dto/create-room.dto';
import { RoomModel } from '../models/room.model';

@Injectable()
export class RoomService extends BaseService<RoomModel> {
	name = 'Room';

	constructor(
		@InjectModel(RoomModel.name)
		private readonly roomModel: Model<RoomModel>,
		private readonly adminService: AdminService
	) {
		super(roomModel);
	}

	async create(input: CreateRoomDto) {
		const { members } = input;
		for (let i = 0; i < members.length; i++) {
			const adminId = members[i];
			await this.adminService.getOneById(adminId);
		}
		return this.model.create(input);
	}
}
