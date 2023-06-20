import { MetadataKey, StrategyKey } from '@app/constants';
import { Roles } from '@app/enums';
import { RoleGuard } from '@app/guards';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export const AuthAdmin = (...roles: Roles[]) => {
	return applyDecorators(
		SetMetadata(MetadataKey.ROLE, roles),
		UseGuards(AuthGuard(StrategyKey.JWT.ADMIN)),
		UseGuards(RoleGuard),
		ApiBearerAuth()
	);
};
