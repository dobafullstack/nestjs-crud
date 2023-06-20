import { PaginationDto } from '@app/base';
import { AuthAdmin } from '@app/decorators/auth-admin.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from '../services/message.service';

@Controller('message')
@ApiTags('Message API')
@AuthAdmin()
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get('/:roomId')
	getAllByRoom(@Param('roomId') roomId: string, @Query() query: PaginationDto) {
		return this.messageService.getAllWithPagination(query, {
			roomId
		});
	}
}
