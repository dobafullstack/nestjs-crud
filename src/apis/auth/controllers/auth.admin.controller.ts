import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StrategyKey } from 'src/common/constant';
import { AdminEntity } from '../../admin/entities/admin.entity';
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
