import { applyDecorators } from '@nestjs/common';
import { ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { OkResponse } from 'src/common/base/base.swagger';
import { AdminEntity } from '../admin/entities/admin.entity';
import { UserType } from './interfaces/auth.interface';

const getRef = (userType: UserType) => {
	let $ref;

	switch (userType) {
		case 'admin':
			$ref = AdminEntity;
			break;
	}

	return $ref;
};

const loginResponse = (userType: UserType) => ({
	properties: {
		result: {
			type: 'array',
			items: {
				properties: {
					user: {
						$ref: getSchemaPath(getRef(userType))
					},
					accessToken: { example: 'string' }
				}
			}
		}
	}
});

export function ApiRefreshToken(userType: UserType) {
	return applyDecorators(
		ApiOperation({ summary: 'Refresh token for ' + userType }),
		OkResponse(null, false, loginResponse(userType))
	);
}

export function ApiLogin(userType: UserType) {
	return applyDecorators(
		ApiOperation({ summary: 'Login for ' + userType }),
		OkResponse(null, false, loginResponse(userType))
	);
}

export function ApiChangePassword(userType: UserType) {
	return applyDecorators(
		ApiOperation({ summary: 'Change password for ' + userType }),
		OkResponse(getRef(userType))
	);
}

export function ApiLogout(userType: UserType) {
	return applyDecorators(
		ApiOperation({ summary: 'Logout for ' + userType }),
		OkResponse(null, false, { example: { message: 'Logout successfully' } })
	);
}
