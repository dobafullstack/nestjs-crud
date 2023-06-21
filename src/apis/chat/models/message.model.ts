import { BaseModel } from '@app/base/base.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AdminModel } from 'src/apis/admin/models/admin.model';
import { RoomModel } from './room.model';

export type MessageDocument = HydratedDocument<MessageModel>;

@Schema({
	collection: 'message'
})
export class MessageModel extends BaseModel {
	@Prop()
	text!: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: AdminModel.name })
	userId!: string;

	@Prop({ name: mongoose.Schema.Types.ObjectId, ref: RoomModel.name })
	roomId!: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
