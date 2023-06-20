import { Roles } from '@app/enums/role.enum';
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateAdminDto {
	@IsNumberString()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;

	@IsEnum(Roles)
	role!: Roles;
}
