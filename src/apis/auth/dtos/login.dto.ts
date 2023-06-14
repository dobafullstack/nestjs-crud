import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class LoginDto {
	@IsNumberString()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;
}
