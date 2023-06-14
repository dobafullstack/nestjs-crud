import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MetadataKey, StrategyKey } from '../constant';
import { Roles } from '../enums/role.enum';
import { RoleGuard } from '../guards/role.guard';

export const AuthAdmin = (...roles: Roles[]) => {
	return applyDecorators(
		SetMetadata(MetadataKey.ROLE, roles),
		UseGuards(AuthGuard(StrategyKey.JWT.ADMIN)),
		UseGuards(RoleGuard),
		ApiBearerAuth()
	);
};
