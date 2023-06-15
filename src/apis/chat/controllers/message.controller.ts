import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/base/base.dto';
import { MessageService } from '../services/message.service';
import { AuthAdmin } from 'src/common/decorators/auth-admin.decorator';

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
