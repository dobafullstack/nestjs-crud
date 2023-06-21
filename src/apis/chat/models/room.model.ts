import { BaseModel } from '@app/base/base.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AdminModel } from 'src/apis/admin/models/admin.model';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema({
	collection: 'room'
})
export class RoomModel extends BaseModel {
	@Prop()
	name!: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: AdminModel.name }] })
	members!: string[];
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel);
