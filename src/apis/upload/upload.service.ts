import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname } from 'path';

@Injectable()
export class UploadService {
	private checkDir() {
		const path = './uploads';

		if (!existsSync(path)) {
			mkdirSync(path);
		}
	}

	uploadSingle(req: Request, file: Express.Multer.File) {
		this.checkDir();

		const randomName = Array(32)
			.fill(null)
			.map(() => Math.round(Math.random() * 16).toString(16))
			.join('');

		const fileName = `${randomName}${extname(file.originalname)}`;
		const filePath = `./uploads/${fileName}`;

		try {
			writeFileSync(filePath, file.buffer);
			return fileName;
		} catch (err: any) {
			throw new ForbiddenException([
				{
					field: 'file',
					message: err.message
				}
			]);
		}
	}

	uploadMultiple(req: Request, files: Array<Express.Multer.File>) {
		this.checkDir();

		const response: string[] = [];

		for (const file of files) {
			const randomName = Array(32)
				.fill(null)
				.map(() => Math.round(Math.random() * 16).toString(16))
				.join('');

			const fileName = `${randomName}${extname(file.originalname)}`;
			const filePath = `./uploads/${fileName}`;

			response.push(fileName);

			try {
				writeFileSync(filePath, file.buffer);
			} catch (err: any) {
				console.error(`Failed to save file: ${err.message}`);
			}
		}
		return response;
	}
}
