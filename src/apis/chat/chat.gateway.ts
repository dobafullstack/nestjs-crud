import { TokenExpires } from '@app/constants';
import { JwtService } from '@app/jwt';
import { RedisService } from '@app/redis';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AdminService } from '../admin/services/admin.service';
import { ChatMessage } from './dto/chat-message.dto';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';

@WebSocketGateway({
	namespace: '/pooling',
	cors: {
		origin: '*'
	}
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server!: Server;

	constructor(
		private readonly redisService: RedisService,
		private readonly jwtService: JwtService,
		private readonly adminService: AdminService,
		private readonly roomService: RoomService,
		private readonly messageService: MessageService
	) {}

	async handleDisconnect(client: Socket) {
		const user = await this.getUserData(client);
		this.redisService.del(`CHAT:${user.id}`);
	}

	async handleConnection(client: Socket, ..._args: any[]) {
		const user = await this.getUserData(client);
		this.redisService.set({
			key: `CHAT:${user.id}`,
			value: client.id,
			expired: TokenExpires.redisRefreshToken
		});
	}

	afterInit(_server: Server) {
		// console.log(server);
	}

	async getUserData(client: Socket) {
		const bearerToken = client.handshake.headers.authorization;
		const token = bearerToken?.split(' ')[1];
		if (!token) {
			throw new UnauthorizedException('Missing access token');
		}
		const { id } = await this.jwtService.verifyJwt(token);
		await this.redisService.getAccessToken(id);
		return this.adminService.getOneByIdOrFail(id);
	}

	@SubscribeMessage('sendMessage')
	async sendMessage(client: Socket, payload: ChatMessage): Promise<void> {
		const { text, roomId } = payload;
		const user = await this.getUserData(client);
		if (!text || !roomId) {
			throw new BadRequestException('Missing payload');
		}
		const room = await this.roomService.getOneByIdOrFail(roomId);
		const { members } = room;
		const socketIds: string[] = [];
		for (let i = 0; i < members.length; i++) {
			const userId = members[i];
			const socketId = await this.redisService.get(`CHAT:${userId}`);
			if (socketId) {
				socketIds.push(socketId);
			}
		}
		const message = new MessageEntity();
		message.roomId = roomId;
		message.user = user;
		message.text = text;
		const newMessage = await message.save();
		socketIds.forEach((socketId) => {
			client.to(socketId).emit('receiveMessage', {
				...newMessage,
				user: {
					...user,
					password: undefined
				}
			});
		});
	}
}
