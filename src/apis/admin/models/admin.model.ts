import { BaseModel } from '@app/base/base.model';
import { Roles } from '@app/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<AdminModel>;

@Schema({
	collection: 'admin',
	toJSON: {
		transform(_doc, ret, _options) {
			delete ret.password;
		}
	}
})
export class AdminModel extends BaseModel {
	@Prop()
	phone!: string;

	@Prop()
	@ApiHideProperty()
	password!: string;

	@Prop()
	role!: Roles;
}

export const AdminSchema = SchemaFactory.createForClass(AdminModel);

AdminSchema.pre('save', async function () {
	this.password = await argon2.hash(this.password);
});
