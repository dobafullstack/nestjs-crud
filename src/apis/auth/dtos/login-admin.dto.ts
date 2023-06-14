import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class LoginAdminDto {
	@IsNumberString()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;
}
