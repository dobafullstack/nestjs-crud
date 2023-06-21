import { NotFoundException } from '@nestjs/common';
import {
	AnyKeys,
	FilterQuery,
	HydratedDocument,
	Model as MongoModel,
	SortOrder,
	UpdateQuery
} from 'mongoose';
import { PaginationDto } from './base.dto';
import { BaseModel } from './base.model';

export abstract class BaseService<Model extends BaseModel> {
	abstract name: string;

	constructor(public readonly model: MongoModel<Model>) {}

	async getAll(
		filter: FilterQuery<Model>,
		...references: string[]
	): Promise<HydratedDocument<Model>[]> {
		const model = this.model.find(filter);
		references.forEach((reference) => model.populate(reference));
		return model.exec().then((res) => res['_doc']);
	}

	async getAllWithPagination(
		query: PaginationDto,
		filter: FilterQuery<Model>,
		sort?: { [key: string]: SortOrder },
		...references: string[]
	): Promise<[HydratedDocument<Model>[], number]> {
		const limit = query.limit ? +query.limit : 10;
		const page = query.page ? +query.page : 1;
		const skip = limit * (page - 1);
		delete query.limit;
		delete query.page;

		const queryKeys = Object.keys(query);
		for (let i = 0; i < queryKeys.length; i++) {
			const key = queryKeys[i];
			Object.assign(filter, query[key]);
		}

		const count = await this.model.count(filter);
		const model = this.model.find(filter).limit(limit).skip(skip).sort(sort);
		references.forEach((reference) => model.populate(reference));
		return model.exec().then((res) => [res, count]);
	}

	async getOne(
		filter: FilterQuery<Model>,
		...references: string[]
	): Promise<HydratedDocument<Model> | null> {
		const model = this.model.findOne(filter);
		references.forEach((reference) => model.populate(reference));
		return model.exec();
	}

	async getOneById(
		_id: string,
		...references: string[]
	): Promise<HydratedDocument<Model> | null> {
		const model = this.model.findOne({ _id });
		references.forEach((reference) => model.populate(reference));
		return model.exec();
	}

	async getOneOrFail(
		filter: FilterQuery<Model>,
		...references: string[]
	): Promise<HydratedDocument<Model>> {
		const model = this.model.findOne(filter);
		references.forEach((reference) => model.populate(reference));
		const getOneModel = await model.exec();
		if (!getOneModel) {
			const errorMessage = `${this.name} not found`;
			throw new NotFoundException(errorMessage);
		}
		return getOneModel;
	}

	async getOneByIdOrFail(_id: string, ...references: string[]): Promise<HydratedDocument<Model>> {
		const model = this.model.findById(_id);
		references.forEach((reference) => model.populate(reference));
		const getOneModel = await model.exec();
		if (!getOneModel) {
			const errorMessage = `${this.name} not found`;
			throw new NotFoundException(errorMessage);
		}
		return getOneModel;
	}

	async create(data: Model | AnyKeys<Model>): Promise<HydratedDocument<Model>> {
		return this.model.create(data);
	}

	async createMany(...data: (Model | AnyKeys<Model>)[]): Promise<HydratedDocument<Model>[]> {
		return this.model.create(data);
	}

	async updateBy(
		filter: FilterQuery<Model>,
		update: UpdateQuery<Model>
	): Promise<HydratedDocument<Model>> {
		const model = await this.getOneOrFail(filter);
		await this.model.findOneAndUpdate(filter, update, { new: true });
		return Object.assign(model, update);
	}

	async updateById(_id: string, update: UpdateQuery<Model>): Promise<HydratedDocument<Model>> {
		const model = await this.getOneByIdOrFail(_id);
		await this.model.findOneAndUpdate({ _id }, update, { new: true });
		return Object.assign(model, update);
	}

	async deleteBy(filter: FilterQuery<Model>): Promise<HydratedDocument<Model>> {
		const model = await this.getOneOrFail(filter);
		await this.model.findOneAndDelete(filter);
		return model;
	}

	async deleteById(_id: string): Promise<HydratedDocument<Model>> {
		const model = await this.getOneByIdOrFail(_id);
		await this.model.findOneAndDelete({ _id });
		return model;
	}

	async softDelete(filter: FilterQuery<Model>): Promise<HydratedDocument<Model>> {
		const model = await this.getOneOrFail(filter);
		const now = new Date();
		const update = { deletedAt: now };
		await this.model.findOneAndUpdate(filter, update);
		return Object.assign(model, update);
	}

	async softDeleteById(_id: string): Promise<HydratedDocument<Model>> {
		const model = await this.getOneOrFail({ _id });
		const now = new Date();
		const update = { deletedAt: now };
		await this.model.findOneAndUpdate({ _id }, update);
		return Object.assign(model, update);
	}
}
