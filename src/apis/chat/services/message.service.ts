import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminService } from 'src/apis/admin/services/admin.service';
import { BaseService } from 'src/common/base/base.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { RoomService } from './room.service';

@Injectable()
export class MessageService extends BaseService<MessageEntity> {
	name = 'Message';

	constructor(
		@InjectRepository(MessageEntity)
		messageRepo: Repository<MessageEntity>,
		private readonly adminService: AdminService,
		private readonly roomService: RoomService
	) {
		super(messageRepo);
	}

	async create(input: CreateMessageDto) {
		const { userId, roomId } = input;
		await this.adminService.getOneByIdOrFail(userId);
		await this.roomService.getOneByIdOrFail(roomId);
		return this.repo.create(input).save();
	}
}
