<!-- -_-  -->
<details>
<summary>简介</summary>

生成一个基于 nestjs 的项目

</details>

<!-- -_-  -->
<details>
<summary>初始化项目</summary>

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

`git rm -r --cached dist`

```
# .gitignore
node_modules
/dist
```

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
<summary>项目启动</summary>

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
