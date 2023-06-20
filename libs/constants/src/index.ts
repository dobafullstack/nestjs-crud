export const MetadataKey = {
	REDIS: 'redis',
	ROLE: 'role'
};

export const StrategyKey = {
	LOCAL: {
		ADMIN: 'local_admin'
	},
	JWT: {
		ADMIN: 'jwt_admin'
	}
};

export const TokenExpires = {
	accessToken: '15d',
	refreshToken: '30d',
	redisAccessToken: 60 * 60 * 24 * 15,
	redisRefreshToken: 60 * 60 * 24 * 30
};
