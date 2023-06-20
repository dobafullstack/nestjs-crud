import { StrategyKey } from '@app/constants';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminEntity } from 'src/apis/admin/entities/admin.entity';
import { AuthService } from '../services/auth.service';
import { AuthBaseController } from './auth.base.controller';

@ApiTags('Auth API For Admin')
@Controller('/auth/admin')
export class AuthAdminController extends AuthBaseController<AdminEntity>(
	'admin',
	StrategyKey.LOCAL.ADMIN
) {
	constructor(public readonly authService: AuthService) {
		super(authService);
	}
}
