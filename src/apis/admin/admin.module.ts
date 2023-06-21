import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controllers/admin.controller';
import { AdminModel, AdminSchema } from './models/admin.model';
import { AdminService } from './services/admin.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: AdminModel.name, schema: AdminSchema }])],
	controllers: [AdminController],
	providers: [AdminService],
	exports: [AdminService]
})
export class AdminModule {}
