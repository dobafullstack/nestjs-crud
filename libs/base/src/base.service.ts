/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getQueryBuilder } from '@app/helpers/queryBuilder';
import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginationDto } from './base.dto';
import { BaseEntity } from './base.entity';

export abstract class BaseService<Entity extends BaseEntity> {
	abstract name: string;

	constructor(public readonly repo: Repository<Entity>) {}

	async getAll(
		where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		...relations: string[]
	): Promise<Entity[]> {
		return this.repo.find({ where, relations });
	}

	async getAllWithPagination(
		query: PaginationDto,
		where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		order?: FindOptionsOrder<Entity>,
		...relations: string[]
	): Promise<[Entity[], number]> {
		const queryBuilder = getQueryBuilder(this.repo, query, where, order, ...relations);
		return queryBuilder.getManyAndCount();
	}

	async getOne(
		where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		...relations: string[]
	): Promise<Entity | null> {
		return this.repo.findOne({ where, relations });
	}

	async getOneById(id: string, ...relations: string[]): Promise<Entity | null> {
		//@ts-ignore
		return this.repo.findOne({ where: { id }, relations });
	}

	async getOneOrFail(
		where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]
	): Promise<Entity> {
		const entity = await this.repo.findOne({ where });
		if (!entity) {
			const errorMessage = `${this.name} not found`;
			throw new NotFoundException(errorMessage);
		}
		return entity;
	}

	async getOneByIdOrFail(id: string, ...relations: string[]): Promise<Entity> {
		//@ts-ignore
		const entity = await this.repo.findOne({ where: { id }, relations });
		if (!entity) {
			const errorMessage = `${this.name} not found`;
			throw new NotFoundException(errorMessage);
		}
		return entity;
	}

	async create(data: DeepPartial<Entity>): Promise<Entity> {
		return this.repo.create(data).save();
	}

	async createMany(data: DeepPartial<Entity>[]): Promise<Entity[]> {
		const result: Entity[] = [];
		const newEntities = this.repo.create(data);
		for (let i = 0; i < newEntities.length; i++) {
			const newEntity = await newEntities[i].save();
			result.push(newEntity);
		}
		return result;
	}

	async update(entity: Entity, data: QueryDeepPartialEntity<Entity>) {
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			entity[key] = data[key];
		}
		return entity.save();
	}

	async updateBy(
		where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		data: QueryDeepPartialEntity<Entity>
	) {
		const entity = await this.getOneOrFail(where);
		return this.update(entity, data);
	}

	async updateById(id: string, data: QueryDeepPartialEntity<Entity>) {
		const entity = await this.getOneByIdOrFail(id);
		return this.update(entity, data);
	}

	async deleteBy(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
		const entity = await this.getOneOrFail(where);
		return this.repo.remove(entity);
	}

	async deleteById(id: string) {
		const entity = await this.getOneByIdOrFail(id);
		return this.repo.remove(entity);
	}

	async softDelete(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
		const entity = await this.getOneOrFail(where);
		return this.repo.softRemove(entity);
	}

	async softDeleteById(id: string) {
		const entity = await this.getOneByIdOrFail(id);
		return this.repo.softRemove(entity);
	}
}
