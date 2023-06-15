import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
	@IsString()
	@IsNotEmpty()
	roomId!: string;

	@IsString()
	@IsNotEmpty()
	userId!: string;

	@IsString()
	@IsNotEmpty()
	text!: string;
}
