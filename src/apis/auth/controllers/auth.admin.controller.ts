import { StrategyKey } from '@app/constants';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminModel } from 'src/apis/admin/models/admin.model';
import { AuthService } from '../services/auth.service';
import { AuthBaseController } from './auth.base.controller';

@ApiTags('Auth API For Admin')
@Controller('/auth/admin')
export class AuthAdminController extends AuthBaseController<AdminModel>(
	'admin',
	StrategyKey.LOCAL.ADMIN
) {
	constructor(public readonly authService: AuthService) {
		super(authService);
	}
}
