import * as argon2 from 'argon2';
import { BaseEntity } from 'src/common/base/base.entity';
import { Roles } from 'src/common/enums/role.enum';
import { BeforeInsert, Column } from 'typeorm';

export class AdminEntity extends BaseEntity {
	@Column()
	phone!: string;

	@Column()
	password!: string;

	@Column()
	role!: Roles;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await argon2.hash(this.password);
	}
}
