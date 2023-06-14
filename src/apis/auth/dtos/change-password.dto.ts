import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	@IsString()
	@IsNotEmpty()
	oldPassword!: string;

	@IsString()
	@IsNotEmpty()
	newPassword!: string;
}
