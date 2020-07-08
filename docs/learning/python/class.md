# 설치하기

To get started, you can either scaffold the project with the [Nest CLI](/cli/overview), or clone a starter project (both will produce the same outcome).

To scaffold the project with the Nest CLI, run the following commands. This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project. Creating a new project with the **Nest CLI** is recommended for first-time users. We'll continue with this approach in [First Steps](first-steps).

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
$ npm run start
```

Open your browser and navigate to [`http://localhost:3000/`](http://localhost:3000/).

## Prerequisites

Please make sure that [Node.js](https://nodejs.org/) (>= 10.13.0) is installed on your operating system.

Here's a brief overview of those core files:

| File                | Description                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `app.controller.ts` | Basic controller sample with a single route.                                                                        |
| `app.module.ts`     | The root module of the application.                                                                                 |
| `main.ts`           | The entry file of the application which uses the core function `NestFactory` to create a Nest application instance. |

The `main.ts` includes an async function, which will **bootstrap** our application:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
