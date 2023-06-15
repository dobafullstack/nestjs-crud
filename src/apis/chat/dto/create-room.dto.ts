import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	members!: string[];
}
