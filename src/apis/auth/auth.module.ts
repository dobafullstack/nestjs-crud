import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './controllers/auth.admin.controller';
import { AuthService } from './services/auth.service';

@Module({
	imports: [AdminModule],
	providers: [AuthService],
	controllers: [AuthAdminController]
})
export class AuthModule {}
