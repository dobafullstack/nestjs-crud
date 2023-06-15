import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminEntity } from 'src/apis/admin/entities/admin.entity';
import { BaseController } from 'src/common/base/base.controller';
import { PaginationDto } from 'src/common/base/base.dto';
import { ApiCreate, ApiUpdate } from 'src/common/base/base.swagger';
import { AuthAdmin } from 'src/common/decorators/auth-admin.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { ArrayContains } from 'typeorm';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { RoomEntity } from '../entities/room.entity';
import { RoomService } from '../services/room.service';

@Controller('room')
@ApiTags('Chat Room API')
@AuthAdmin()
export class RoomController extends BaseController<RoomEntity>(RoomEntity, 'room') {
	relations = [];

	constructor(private readonly roomService: RoomService) {
		super(roomService);
	}

	@Get('/all')
	getAllByUserId(@Query() query: PaginationDto, @User() user: AdminEntity) {
		return this.roomService.getAllWithPagination(query, {
			members: ArrayContains([user.id])
		});
	}

	@Post('create')
	@ApiCreate(RoomEntity, 'room')
	create(@Body() body: CreateRoomDto): Promise<RoomEntity> {
		return super.create(body);
	}

	@Post('update/:id')
	@ApiUpdate(RoomEntity, 'room')
	update(@Param('id') id: string, @Body() body: UpdateRoomDto): Promise<RoomEntity> {
		return super.update(id, body);
	}
}
