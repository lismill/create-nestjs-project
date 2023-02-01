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
