import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { StrategyKey } from 'src/common/constant';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, StrategyKey.LOCAL.ADMIN) {
	constructor() {
		super({
			usernameField: 'phone',
			passwordField: 'password'
		});
	}

	async validate(phone: string, password: string) {
		// const where = { phone };
		// const user = await this.adminService.getOne(where, 'role');
		// if (!user || !(await compare(password, user.password))) {
		// 	throw new UnauthorizedException(authTypes().AUTH_ADMIN_INCORRECT);
		// }
		// return user;
	}
}
