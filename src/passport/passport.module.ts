import { Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { JwtAdminStrategy } from './strategies/jwt/admin.jwt.strategy';
import { AdminStrategy } from './strategies/local/admin.local.strategy';

@Module({
	imports: [NestPassportModule],
	providers: [AdminStrategy, JwtAdminStrategy]
})
export class PassportModule {}
