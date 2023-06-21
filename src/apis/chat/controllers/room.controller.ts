import { ApiCreate, ApiUpdate, BaseController, PaginationDto } from '@app/base';
import { AuthAdmin } from '@app/decorators/auth-admin.decorator';
import { User } from '@app/decorators/user.decorator';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { AdminModel } from 'src/apis/admin/models/admin.model';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { RoomService } from '../services/room.service';
import { RoomModel } from './../models/room.model';

@Controller('room')
@ApiTags('Chat Room API')
@AuthAdmin()
export class RoomController extends BaseController<RoomModel>(RoomModel, 'room') {
	relations = [];

	constructor(private readonly roomService: RoomService) {
		super(roomService);
	}

	@Get('/all')
	getAllByUserId(@Query() query: PaginationDto, @User() user: HydratedDocument<AdminModel>) {
		return this.roomService.getAllWithPagination(query, {
			members: user.id
		});
	}

	@Post('create')
	@ApiCreate(RoomModel, 'room')
	create(@Body() body: CreateRoomDto): Promise<RoomModel> {
		return super.create(body);
	}

	@Post('update/:id')
	@ApiUpdate(RoomModel, 'room')
	update(@Param('id') id: string, @Body() body: UpdateRoomDto) {
		return super.update(id, body);
	}
}
