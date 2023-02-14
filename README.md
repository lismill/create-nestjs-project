<!-- -_-  -->
<details>
<summary>简介</summary>

生成一个基于 nestjs 的项目

</details>

<!-- -_-  -->
<details>
<summary>初始化项目</summary>

### 配置

```bash
npm i -g @nestjs/cli
nest new project-name

cd project-name
npm install

```

</details>

<!-- -_-  -->
<details>
<summary>Git 提交规范、提交信息校验、lint-staged</summary>

### 配置

```bash
# 提交规范
npm install --save-dev commitizen

# 提交信息校验
npm install @commitlint/cli --save-dev
npm install @commitlint/config-conventional --save-dev

# 校验暂存区
npm install husky lint-staged --save-dev
npx husky install
npm set-script prepare "husky install"
npm run prepare
```

`./.husky/commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

`./.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run precommit
```

`./package.json`

```json
"scripts": {
  "commit": "git add . && git cz",
  "precommit": "lint-staged",
  "prepare": "husky install"
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

`./.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

`./commitlint.config.js`

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

`.eslintrc.js`

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
```

`./.eslintignore`

```
/node_modules
/dist
/package-lock.json
/.vscode
```

`./.lintstagedrc`

```
{
  "*.{ts,js}": ["eslint"]
}
```

</details>

<!-- -_-  -->
<details>
<summary>添加 git 忽略文件</summary>

### 配置

`git rm -r --cached dist`

```
# .gitignore
node_modules
/dist
```

</details>

<!-- -_-  -->
<details>
<summary>配置 VSCode 断点调试</summary>

### 配置

`.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch NestJS",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/main.ts"
    }
  ]
}
```

### 启动

`Press F5`

</details>

<!-- -_-  -->
<details>
<summary>集成Swagger自动生成接口文档</summary>

### 安装

`npm install @nestjs/swagger swagger-ui-express --save`

### 配置

`./main.ts`

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Swagger
const options = new DocumentBuilder()
  .setTitle('create-nestjs-project')
  .setDescription('create-nestjs-project')
  .setTermsOfService('https://docs.nestjs.cn/8/introduction')
  .setVersion('0.0.1')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('/doc/swagger-api', app, document);
```

### 使用

`./system.controller.ts`

```ts
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('系统设置')

@ApiParam({ name: 'id', description: 'id', required: true, type: 'string' })
remove(@Param() param: { id: string }) {
  return this.systemService.remove(param);
}
```

### 预览文档

`/doc/swagger-api`

</details>

<!-- -_-  -->
<details>
<summary>命令行创建 modules</summary>

### 配置

`./scripts/g.sh`

```bash
#!/bin/bash

echo ""
read -p "✨ - Please enter module name: " name
echo "✨ - module name: $name"
echo "✨ - ↓ Please waiting..."
echo ""
nest g resource modules/$name --no-spec
echo ""
echo "😊 - √ Done"
echo ""
```

</details>

<!-- -_-  -->
<details>
<summary>路由前缀和接口版本控制</summary>

### 配置

`./main.ts`

```ts
app.setGlobalPrefix('api');
```

`版本控制`

`./main.ts`

```ts
import { VersioningType } from '@nestjs/common';
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
```

### 使用

`*.controller.ts`

```ts
@Controller({ path: 'system', version: '1' })
// /api/v1/system
```

</details>

<!-- -_-  -->
<details>
<summary>配置信息与环境变量</summary>

### 安装依赖

`npm install --save-dev @nestjs/config cross-env`

### 配置

`./package.json`

```json
"start": "npm run start:development",
"start:development": "cross-env NODE_ENV=development nest start --watch",
"start:production": "cross-env NODE_ENV=production nest start",
"build": "npm run build:development",
"build:development": "cross-env NODE_ENV=development nest build",
"build:production": "cross-env NODE_ENV=production nest build",
```

`./main.ts`

```ts
const app = await NestFactory.create(AppModule);

// Prefix
app.setGlobalPrefix(process.env.PREFIX);

// Version
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: process.env.VERSION,
});
```

`./app.module.ts`

```ts
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
  isGlobal: true,
}),
```

`.env`

```
ENV = 'development'
NAMES = '.env'

PORT = 3789
VERSION = 1
PREFIX = 'api'
```

`.env.development`

```
ENV = 'development'
NAME = '.env.development'
```

`.env.production`

```
ENV = 'production'
NAME = '.env.production'
```

`.gitignore`

```
.env
.env.development
.env.production
```

### 使用

```ts
console.log(process.env.PREFIX);
console.log(process.env.ENV);
console.log(process.env.NAMES);
```

</details>

<!-- -_-  -->
<details>
<summary>配置统一数据格式返回</summary>

### 配置

`./interceptor/transform.interceptor.ts`

```ts
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 0,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}
```

`./filters/http-exception.filter.ts`

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = exception.message;
    Logger.log('错误提示', message);
    const errorResponse = {
      code: -1,
      message: '请求失败',
      timestamp: Date.now(),
      url: request.originalUrl,
      data: {
        error: message,
      },
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
```

`./main.ts`

```ts
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

// transform.interceptor
app.useGlobalInterceptors(new TransformInterceptor());

// http-exception.filter
app.useGlobalFilters(new HttpExceptionFilter());
```

</details>

<!-- -_-  -->
<details>
<summary>NestJS + TypeORM 增删改查</summary>

### 安装依赖

`npm install --save typeorm @nestjs/typeorm class-validator mysql2`

### 配置使用

`./app.module.ts`

```ts
// TypeOrmModule
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: process.env.DB_AUTOLOADENTITIES === 'true',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
}),
```

`./src/entity/index.ts`

```ts
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
```

`./src/modules/user/entities/user.entity.ts`

```ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entity/index';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ length: 16, comment: '名称', unique: true })
  name: string;

  @Column({ comment: '年龄', nullable: true })
  age: number;

  @Column({ length: 16, comment: '城市', nullable: true })
  city: string;
}
```

`./src/modules/user/dto/create-user.dto.ts`

```ts
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  age: number;

  city: string;
}
```

`./src/modules/user/dto/update-user.dto.ts`

```ts
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}
```

`./src/modules/user/user.module.ts`

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

`./src/modules/user/user.controller.ts`

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
```

`./src/modules/user/user.service.ts`

```ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.find({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let result = await this.userRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException('DATA_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    delete updateUserDto?.id;
    result = { ...result, ...updateUserDto };
    return await this.userRepository.save(result);
  }

  async remove(id: number) {
    const result = await this.userRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException('DATA_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.remove(result);
  }
}
```

</details>
<!-- -_-  -->
<details>
<summary>项目启动</summary>

### 配置

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

</details>

<!-- -_-  -->
<details>
<summary>打包部署</summary>
</details>
