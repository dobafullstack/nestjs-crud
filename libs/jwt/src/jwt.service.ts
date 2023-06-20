import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';

@Injectable()
export class JwtService extends NestJwtService {
	signJwt(payload: JwtPayload, isRefreshToken = false) {
		const expiresIn = isRefreshToken ? '30d' : '15d';
		const token = this.sign(payload, {
			expiresIn,
			secret: process.env.SECRET_JWT
		});

		return token;
	}

	async verifyJwt(token: string) {
		try {
			const payload = await this.verify<JwtPayload>(token, {
				secret: process.env.SECRET_JWT
			});

			return payload;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
