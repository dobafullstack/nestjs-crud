import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
	imports: [AdminModule, AuthModule, UploadModule]
})
export class ApiModule {}
