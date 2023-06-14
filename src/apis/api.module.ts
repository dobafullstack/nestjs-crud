import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';

@Module({
	imports: [AdminModule]
})
export class ApiModule {}
