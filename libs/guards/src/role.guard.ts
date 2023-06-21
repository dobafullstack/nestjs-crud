import { MetadataKey } from '@app/constants';
import { Roles } from '@app/enums';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { Observable } from 'rxjs';
import { AdminModel } from 'src/apis/admin/models/admin.model';
import { AdminService } from 'src/apis/admin/services/admin.service';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector, private adminService: AdminService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(MetadataKey.ROLE, [
			context.getHandler(),
			context.getClass()
		]);
		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}
		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user as HydratedDocument<AdminModel>;
		if (!requiredRoles.includes(user.role)) {
			throw new ForbiddenException('Permission deny');
		}
		return true;
	}
}
