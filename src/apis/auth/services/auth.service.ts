import { CryptoService } from '@app/crypto';
import { SetCookieRFToken } from '@app/helpers/setCookieRFToken';
import { JwtService } from '@app/jwt';
import { RedisService } from '@app/redis';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { AdminService } from 'src/apis/admin/services/admin.service';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { User, UserType } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly adminService: AdminService,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService,
		private readonly cryptoService: CryptoService
	) {}

	login(user: User, response: Response) {
		const { id } = user;
		const payload = { id };

		// Generate accessToken
		const accessToken = this.jwtService.signJwt(payload);
		const refreshToken = this.jwtService.signJwt(payload, true);

		//Cache token
		this.redisService.setRefreshToken(id, refreshToken);
		this.redisService.setAccessToken(id, accessToken);

		//Encrypt cookie
		const encryptId = this.cryptoService.encryptData(id);
		SetCookieRFToken(response, encryptId);
		const result = { user, accessToken };
		return result;
	}

	async refreshToken(request: Request, userType: UserType) {
		const { sub } = request.cookies;

		const decryptData = this.cryptoService.decryptData(sub);
		const refreshToken = await this.redisService.getRefreshToken(decryptData);
		// Get Token from refresh token
		const user = await this.getUser(refreshToken, userType);
		const { _id } = user;
		const accessToken = this.jwtService.signJwt({ id: _id.toString() });
		const result = { user, accessToken };
		return result;
	}

	async getUser(refreshToken: string, userType: UserType) {
		const { id } = await this.jwtService.verifyJwt(refreshToken);
		const where = { id };
		const targetServices = this.getService(userType);
		const user = await targetServices.getOne(where);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async changePassword(input: ChangePasswordDto, user: User, userType: UserType) {
		const { newPassword, oldPassword } = input;
		const comparePassword = await argon2.verify(user.password, oldPassword);
		if (!comparePassword) {
			throw new BadRequestException({ oldPassword: 'Invalid old password' });
		}
		const hashedPassword = await argon2.hash(newPassword);
		const targetServices = this.getService(userType);
		return targetServices.updateById(user._id.toString(), { password: hashedPassword });
	}

	async logout(user: User) {
		const sub = user._id.toString();
		this.redisService.delRFToken(sub);
		this.redisService.delAccessToken(sub);
		const result = { message: 'Logout successfully' };
		return result;
	}

	getService(userType: UserType) {
		let targetServices: AdminService;
		switch (userType) {
			case 'admin':
				targetServices = this.adminService;
				break;
		}
		return targetServices;
	}
}
