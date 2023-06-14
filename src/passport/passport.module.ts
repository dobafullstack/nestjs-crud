import { Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/apis/admin/admin.module';
import { RedisModule } from 'src/redis/redis.module';
import { JwtAdminStrategy } from './strategies/jwt/admin.jwt.strategy';
import { AdminStrategy } from './strategies/local/admin.local.strategy';

@Module({
	imports: [NestPassportModule, AdminModule, RedisModule],
	providers: [AdminStrategy, JwtAdminStrategy]
})
export class PassportModule {}
