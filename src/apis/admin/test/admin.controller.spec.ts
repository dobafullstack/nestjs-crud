import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';

describe('AdminController', () => {
	let controller: AdminController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AdminController],
			providers: [AdminService]
		}).compile();

		controller = module.get<AdminController>(AdminController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
