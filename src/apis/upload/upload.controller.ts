import {
	Controller,
	HttpCode,
	ParseFilePipeBuilder,
	Post,
	Req,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('Upload API')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				media: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	uploadSingle(
		@Req() req: Request,
		@UploadedFile(new ParseFilePipeBuilder().build())
		file: Express.Multer.File
	) {
		return this.uploadService.uploadSingle(req, file);
	}
}
