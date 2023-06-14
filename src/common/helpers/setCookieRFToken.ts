import { Response } from 'express';
import { TokenExpires } from '../constant';

export function SetCookieRFToken(response: Response, encryptId: string) {
	response.cookie('sub', encryptId, {
		maxAge: TokenExpires.redisRefreshToken,
		httpOnly: true
	});
}
