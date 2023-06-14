import { ApiHideProperty } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base/base.entity';
import { Roles } from 'src/common/enums/role.enum';
import { BeforeInsert, Column, Entity, Unique } from 'typeorm';

@Entity({ name: 'admin' })
@Unique('admin', ['phone'])
export class AdminEntity extends BaseEntity {
	@Column()
	phone!: string;

	@Column()
	@Exclude()
	@ApiHideProperty()
	password!: string;

	@Column()
	role!: Roles;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await argon2.hash(this.password);
	}
}
