import { HydratedDocument } from 'mongoose';
import { AdminModel } from 'src/apis/admin/models/admin.model';

export type UserType = 'admin';

export type User = HydratedDocument<AdminModel>;
