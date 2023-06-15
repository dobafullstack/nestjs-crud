import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UploadModule } from './upload/upload.module';
import { TestModule } from './test/test.module';
import { TestTwoWordModule } from './test-two-word/test-two-word.module';
import { TestTwoWordModule } from './test-two-word/test-two-word.module';
import { TestModule } from './test/test.module';
import { TestModule } from './test/test.module';
import { TestModule } from './test/test.module';
import { TestModule } from './test/test.module';

@Module({
	imports: [AdminModule, AuthModule, UploadModule, ChatModule, TestModule, TestTwoWordModule]
})
export class ApiModule {}
