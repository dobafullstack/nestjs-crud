<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

A NestJS source for fast creating CRUD modules. Using OOP to reuse inheritable classes

## Installation

```bash
$ yarn install
```

## Config environment
```bash
$ cp .env.example .env.development
```

```bash
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=nestjs
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=2
REDIS_PASSWORD= Redis password
SECRET_JWT= What ever
SECRET_KEY= What ever
SECRET_KEY_IV= What ever
MONGO_URL=mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker

```bash
$ docker compose up -d --build
```

## Generate CRUD Module
I have customized @nestjs/schematics that will generate follow my own template.
```bash
$ nest g res module-name
```
Choose Restful and Yes when be asked for CRUD

## Structure
This is my customized template
```bash
module-name
├── controllers
├── dto
├── models
├── services
└── test
```

## Base classes
### BaseModel
```typescript
export class BaseModel {
	@Prop({ type: Date })
	createdAt!: Date;

	@Prop({ type: Date })
	updatedAt!: Date;

	@Prop({ type: Date, default: null })
	deletedAt!: Date;
}
```
This class already includes timestamp, that are necessary for all models
### BaseService
```typescript
export abstract class BaseService<Model extends BaseModel> {
	abstract name: string;

	constructor(public readonly repo: MongoModel<Model>) {}

	async getAll() {
		...
	}

	async getAllWithPagination() {
		...
	}

	async getOne() {
		...
	}

	async getOneById() {
		...
	}

	async getOneOrFail() {
		...
	}

	async getOneByIdOrFail() {
		...
	}

	async create() {
		...
	}

	async createMany() {
		...
	}

	async update() {
		...
	}

	async updateBy() {
		...
	}

	async updateById() {
		...
	}

	async deleteBy() {
		...
	}

	async deleteById() {
		...
	}

	async softDelete() {
		...
	}

	async softDeleteById() {
		...
	}
}
```
This class include all methods that each module needed. 
- create, createMany
- getAll, getOne, getWithPagination
- update
- delete
- softDelete
### BaseController
```typescript
export function BaseController<Model extends BaseModel>($ref: any, name?: string) {
	abstract class Controller {
		abstract relations: string[];

		constructor(public readonly service: BaseService<Model>) {}

		@Post('create')
		@ApiCreate($ref, name)
		create(@Body() body): Promise<Model> {
			return this.service.create(body);
		}

		@Get('all')
		@ApiGetAll($ref, name)
		getAll(@Query() query: PaginationDto): Promise<[Model[], number]> {
			return this.service.getAllWithPagination(
				query,
				{},
				//@ts-ignore
				{ createdAt: 'DESC' },
				...this.relations
			);
		}

		@Get('detail/:id')
		@ApiGetDetail($ref, name)
		getDetail(@Param('id') id: string): Promise<Model> {
			return this.service.getOneByIdOrFail(id, ...this.relations);
		}

		@Patch('update/:id')
		@ApiUpdate($ref, name)
		update(@Param('id') id: string, @Body() body): Promise<Model> {
			return this.service.updateById(id, body);
		}

		@Delete('delete/:id')
		@ApiDelete($ref, name)
		delete(@Param('id') id: string): Promise<Model> {
			return this.service.softDeleteById(id);
		}
	}

	return Controller;
}
```
BaseController just call methods of BaseService.
## Git convention
My project's convention follow on Angular git convention

## Example
In this section, i will tutor you how to fast generate a CRUD Module. Example for User module

### Generate
```bash
$ nest g res apis/user
```

```bash
? Which project would you like to generate to? (Use arrow keys)
❯ src [ Default ] <- Choose this
  jwt 
  crypto 
  redis 
  database 
  base 
  decorators 
(Move up and down to reveal more choices)
```
```bash
? What transport layer do you use? (Use arrow keys)
❯ REST API <- Enter right here
  GraphQL (code first) 
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets
```
```bash
? Would you like to generate CRUD entry points? (Y/n)y <- Type Y for yes
```
Look at terminal, you will see this
```bash
CREATE src/apis/user/user.module.ts (483 bytes)
CREATE src/apis/user/controllers/user.controller.ts (942 bytes)
CREATE src/apis/user/dto/create-user.dto.ts (30 bytes)
CREATE src/apis/user/dto/update-user.dto.ts (164 bytes)
CREATE src/apis/user/models/user.model.ts (361 bytes)
CREATE src/apis/user/services/user.service.ts (443 bytes)
CREATE src/apis/user/test/user.controller.spec.ts (579 bytes)
CREATE src/apis/user/test/user.service.spec.ts (456 bytes)
UPDATE src/apis/api.module.ts (409 bytes)
```
That's all, an CRUD Module for User has been created.
<p align="left">
  <a href="http://nestjs.com/" target="blank"><img src="./images/user-structure.png" width="200" alt="Nest Logo" /></a>
</p>

### UserModule
```typescript
@Module({
	imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
```
This module will automatic import MongooseModule and exports the UserService
### UserModel
```typescript
import { BaseModel } from '@app/base/base.model';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<UserModel>;

@Schema({
	collection: 'user'
})
export class UserModel extends BaseModel {}

export const UserSchema = SchemaFactory.createForClass(UserModel);
```
UserModel just extends BaseModel and name the collection as the name of module
### UserService
```typescript
@Injectable()
export class UserService extends BaseService<UserEntity> {
	name = 'User';

	constructor(
		@InjectModel(UserModel.name)
		private readonly userModel: Model<UserModel>
	) {
		super(userModel);
	}
}
```
UserService extends BaseService with generic UserModel. BaseService have an abstract property is name, that will be module's name. Then inject model into constructor and call super method.
### UserController
```typescript
@Controller('user')
@ApiTags('User API')
export class UserController extends BaseController<UserModel>(UserModel, 'user') {
	relations = [];

	constructor(private readonly userService: UserService) {
		super(userService);
	}

	@Post()
	@ApiCreate(UserModel, 'user')
	create(@Body() body: CreateUserDto) {
		return super.create(body);
	}

	@Patch(':id')
	@ApiUpdate(UserModel, 'user')
	update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return super.update(id, body);
	}
}
```
UserController extends BaseController, that return a class have 5 methods CRUD.
Actually in BaseController already have 2 methods create and update. But it doesn't recognize your dto classes, so i have to override this 2 methods and pass dto classes to parameter

Now, let check it out
```bash
$ yarn start:dev
```

Go to [Swagger](http://localhost:3000/docs)
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="./images/user-swagger.png" width="1000" alt="Nest Logo" /></a>
</p>