import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { MetadataKey, TokenExpires } from 'src/common/constant';
import { RedisType } from 'src/common/interfaces/redis.interface';

@Injectable()
export class RedisService {
	constructor(@Inject(MetadataKey.REDIS) private redis: Redis) {}

	set(redisData: RedisType): Promise<'OK'> {
		const { key, value, expired } = redisData;
		return this.redis.set(key, value, 'EX', expired);
	}

	setNx(redisData: RedisType): Promise<number> {
		return this.redis.setnx(redisData.key, redisData.value);
	}

	get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}
	async getRefreshToken(sub: string) {
		const key = `RF_TOKEN:${sub}`;
		const getRfToken = await this.get(key);
		if (!getRfToken) {
			throw new NotFoundException('Refresh token not found');
		}
		return getRfToken;
	}
	async getAccessToken(sub: string) {
		const key = `AC_TOKEN:${sub}`;
		const accessToken = await this.get(key);
		if (!accessToken) {
			throw new NotFoundException('Access token not found');
		}
		return accessToken;
	}
	async setRefreshToken(sub: string, token: string) {
		const key = `RF_TOKEN:${sub}`;
		return this.set({
			key,
			value: token,
			expired: TokenExpires.redisRefreshToken
		});
	}
	async setAccessToken(sub: string, token: string) {
		const key = `AC_TOKEN:${sub}`;
		return this.set({
			key,
			value: token,
			expired: TokenExpires.redisAccessToken
		});
	}
	async del(key: string) {
		return this.redis.del(key);
	}

	async delRFToken(sub: string) {
		const key = `RF_TOKEN:${sub}`;
		return this.redis.del(key);
	}

	async delAccessToken(sub: string) {
		const key = `AC_TOKEN:${sub}`;
		return this.redis.del(key);
	}
}
