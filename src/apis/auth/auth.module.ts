import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './controllers/auth.admin.controller';
import { AuthService } from './services/auth.service';
import { JwtAdminStrategy } from './strategies/jwt/admin.jwt.strategy';
import { AdminStrategy } from './strategies/local/admin.local.strategy';

@Module({
	imports: [AdminModule, PassportModule],
	controllers: [AuthAdminController],
	providers: [AuthService, JwtAdminStrategy, AdminStrategy]
})
export class AuthModule {}
