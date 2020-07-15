
# Installation

Nuxt.js 를 시작하는 것은 정말 쉬운 일 입니다. 간단한 프로젝트는 'nuxt' 모듈을 설치하는 것 외에 필요한 것은 없습니다. 


## `create-nuxt-app` 로 시작하기

To get started quickly, the Nuxt.js team has created scaffolding tool [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since NPM `5.2.0`)

```bash
$ npx create-nuxt-app <project-name>
```

Or with [yarn](https://yarnpkg.com/en/):

```bash
$ yarn create nuxt-app <project-name>
```

It will ask you some questions (name, Nuxt options, UI framework, TypeScript, linter, testing framework, etc.), when answered, it will install all the dependencies so the next step is to navigate to the project folder and launch it with:

```bash
$ cd <project-name>
$ npm run dev
```

The application is now running on http://localhost:3000.

<div class="Alert">

Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.

</div>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).

## Starting from scratch

Creating a Nuxt.js project from scratch is easy, only *1 file and 1 directory* are required. Create an empty directory to start:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">

<b>Info:</b> replace <code>&lt;project-name&gt;</nom-du-projet></code> with a name for the project.

</div>

### The package.json

Every project needs a `package.json` file to start `nuxt`. Copy this json into your package.json and save before running npm install (below):

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` will launch Nuxt.js via `npm run dev`.

### Installing `nuxt`

With the `package.json` created, add `nuxt` to the project via npm:

```bash
$ npm install --save nuxt
```

### The `pages` directory

Nuxt.js transforms every `*.vue` file inside a `pages` directory as a route for the application.

Create the `pages` directory:

```bash
$ mkdir pages
```

then create the first page in `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

and launch the project with:

```bash
$ npm run dev
```

The application is now running on http://localhost:3000.

<div class="Alert">

Nuxt.js will listen for file changes inside the <code>pages</code> directory, so there is no need to restart the application when adding new pages.

</div>

To discover more about the directory structure of the project: [Directory Structure Documentation](/guide/directory-structure).
