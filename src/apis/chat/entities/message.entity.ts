import { BaseEntity } from '@app/base';
import { AdminEntity } from 'src/apis/admin/entities/admin.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
	@Column()
	text!: string;

	@Column({ name: 'user_id' })
	userId!: string;

	@Column({ name: 'room_id' })
	roomId!: string;

	@ManyToOne(() => AdminEntity)
	@JoinColumn({ name: 'user_id' })
	user?: AdminEntity;

	@ManyToOne(() => RoomEntity)
	@JoinColumn({ name: 'room_id' })
	room?: RoomEntity;
}
