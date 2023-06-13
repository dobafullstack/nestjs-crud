import { Global, Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';

@Global()
@Module({
	imports: [NestPassportModule]
	// providers: [AdminStrategy, JwtAdminStrategy]
})
export class PassportModule {}
