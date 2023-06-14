import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Roles } from 'src/common/enums/role.enum';

export class CreateAdminDto {
	@IsNumberString()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;

	@IsEnum(Roles)
	role!: Roles;
}
