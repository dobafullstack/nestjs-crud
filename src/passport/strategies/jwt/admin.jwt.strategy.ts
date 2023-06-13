import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyKey } from 'src/common/constant';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, StrategyKey.JWT.ADMIN) {
	constructor(private redisService: RedisService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_JWT
		});
	}

	async validate(payload: any) {
		// const { sub: id } = payload;
		// const where = { id };
		// await this.redisService.getAccessToken(id);
		// const admin = await this.adminService.getOne(where, 'role');
		// if (!admin) {
		// 	throw new UnauthorizedException(adminTypes().ADMIN_NOT_FOUND);
		// }
		// return admin;
	}
}
