import { AuthAdmin } from '@app/decorators/auth-admin.decorator';
import { User } from '@app/decorators/user.decorator';
import { Body, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AdminEntity } from 'src/apis/admin/entities/admin.entity';
import { ApiChangePassword, ApiLogin, ApiLogout, ApiRefreshToken } from '../auth.swagger';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserType } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

export const AuthBaseController = <Entity extends AdminEntity>(
	userType: UserType,
	strategyKey: string
) => {
	class BaseController {
		constructor(public readonly authService: AuthService) {}

		@Post('login')
		@HttpCode(200)
		@ApiLogin(userType)
		@UseGuards(AuthGuard(strategyKey))
		async login(
			@Body() _login: LoginDto, // Load to Swagger
			@User() userData: Entity,
			@Res({ passthrough: true }) response: Response
		) {
			return this.authService.login(userData, response);
		}

		@Get('refresh-token')
		@ApiRefreshToken(userType)
		async refreshToken(@Req() request: Request) {
			return this.authService.refreshToken(request, userType);
		}

		@Post('change-password')
		@HttpCode(200)
		@ApiChangePassword(userType)
		@AuthAdmin()
		async changePassword(@Body() body: ChangePasswordDto, @User() user: Entity) {
			return this.authService.changePassword(body, user, userType);
		}

		@Get('logout')
		@HttpCode(200)
		@ApiLogout(userType)
		@AuthAdmin()
		async logout(@User() user: Entity) {
			return this.authService.logout(user);
		}
	}

	return BaseController;
};
