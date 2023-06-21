import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { ChatGateway } from './chat.gateway';
import { MessageController } from './controllers/message.controller';
import { RoomController } from './controllers/room.controller';
import { MessageModel, MessageSchema } from './models/message.model';
import { RoomModel, RoomSchema } from './models/room.model';
import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: RoomModel.name, schema: RoomSchema },
			{ name: MessageModel.name, schema: MessageSchema }
		]),
		AdminModule
	],
	controllers: [RoomController, MessageController],
	providers: [RoomService, ChatGateway, MessageService]
})
export class ChatModule {}
