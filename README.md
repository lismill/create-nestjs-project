## Description

create a nestjs project

## Installation

```bash
$ npm install
```

## 初始化

```bash
npm i -g @nestjs/cli
nest new project-name
```

## Git 提交规范、提交信息校验、lint-staged

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

```
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

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
