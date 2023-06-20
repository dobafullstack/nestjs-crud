import { StrategyKey } from '@app/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as argon2 from 'argon2';
import { Strategy } from 'passport-local';
import { AdminService } from 'src/apis/admin/services/admin.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, StrategyKey.LOCAL.ADMIN) {
	constructor(private readonly adminService: AdminService) {
		super({
			usernameField: 'phone',
			passwordField: 'password'
		});
	}

	async validate(phone: string, password: string) {
		const where = { phone };
		const admin = await this.adminService.getOneOrFail(where);
		const comparePassword = await argon2.verify(admin.password, password);
		if (!comparePassword) {
			throw new UnauthorizedException('Invalid password');
		}
		return admin;
	}
}
