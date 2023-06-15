import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
	@Column()
	name!: string;

	@Column({ type: 'simple-array' })
	members!: string[];
}
