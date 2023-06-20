import { BaseService } from '@app/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminService } from 'src/apis/admin/services/admin.service';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../dto/create-room.dto';
import { RoomEntity } from '../entities/room.entity';

@Injectable()
export class RoomService extends BaseService<RoomEntity> {
	name = 'Room';

	constructor(
		@InjectRepository(RoomEntity)
		private readonly roomRepo: Repository<RoomEntity>,
		private readonly adminService: AdminService
	) {
		super(roomRepo);
	}

	async create(input: CreateRoomDto) {
		const { members } = input;
		for (let i = 0; i < members.length; i++) {
			const adminId = members[i];
			await this.adminService.getOneById(adminId);
		}
		return this.repo.create(input).save();
	}
}
