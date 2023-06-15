import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { ChatGateway } from './chat.gateway';
import { MessageController } from './controllers/message.controller';
import { RoomController } from './controllers/room.controller';
import { MessageEntity } from './entities/message.entity';
import { RoomEntity } from './entities/room.entity';
import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';

@Module({
	imports: [TypeOrmModule.forFeature([RoomEntity, MessageEntity]), AdminModule],
	controllers: [RoomController, MessageController],
	providers: [RoomService, ChatGateway, MessageService]
})
export class ChatModule {}
