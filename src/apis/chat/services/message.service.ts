import { BaseService } from '@app/base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminService } from 'src/apis/admin/services/admin.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageModel } from '../models/message.model';
import { RoomService } from './room.service';

@Injectable()
export class MessageService extends BaseService<MessageModel> {
	name = 'Message';

	constructor(
		@InjectModel(MessageModel.name)
		private readonly messageModel: Model<MessageModel>,
		private readonly adminService: AdminService,
		private readonly roomService: RoomService
	) {
		super(messageModel);
	}

	async create(input: CreateMessageDto) {
		const { userId, roomId } = input;
		await this.adminService.getOneByIdOrFail(userId);
		await this.roomService.getOneByIdOrFail(roomId);
		return this.model.create(input);
	}
}
