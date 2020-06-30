# Installation

## @vue/cli 설치

아래의 명령 중 하나를 사용하여 패키지를 설치합니다.

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

설치가 된 후에는 커맨트 라인에서 vue 바이너리에 접급할 수 있습니다. 아래와 같이 버전을 확인하여 설치가 잘 되었는지 확인해 볼 수 있습니다.

```bash
vue --version
```

## 프로젝트 생성

```bash
vue create hello-world
```

프리셋을 선택하거나 Babel + ESLint setup 을 기본으로 하는 default 를 선택하거나 또는 메뉴얼을 선택하여 프로젝트를 생성할 수 있습니다. 
vuex, vue-router, scss, jest

![An image](/cli-new-project.png)

## 바이너리 실행 
Vue CLI 프로젝트 내부적으로 vue-cli-service 를 사용하게 됩니다. npm scripts 를 terminal 에서 직접 사용할 수 있습니다.

다음은 프로젝트에 생성된 package.json 안에 프리셋 일부 입니다.  
```json
{
  "scripts": {
    "serve": "vue-cli-service serve --port 4500",
    "build": "vue-cli-service build"
  }
}
```
--port 4500 를 통해 실행 포트를 변경합니다.

Npm 또는 Yarn 을 사용해서 다음과 같이 스크립트를 수행할 수 있습니다. 

```bash
npm run serve
# OR
yarn serve
```

브라우저를 열어 링크를 확인해 보세요. [`http://localhost:4500/`](http://localhost:4500/).

## Tailwind CSS

Utility 기반의 CSS 구성이 가능한 Tailwindcss 를 설치합니다.

### Install Tailwind via npm

패키지를 설치합니다. 

```bash
# Using npm
npm install tailwindcss

# Using Yarn
yarn add tailwindcss
```

### Add Tailwind to your CSS

@tailwind directive 를 CSS class 에 사용하기 위해서 사용자의 CSS 파일에 아래의 코드를 추가합니다. 구글 폰트 사용을 위한 코드를 추가합니다.

```js
// src/css/tailwind.css

@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap');

@tailwind base;

@tailwind components;

@tailwind utilities;
```


### Create your Tailwind config file


```bash
npx tailwindcss init
```

위와 같이 실행하여 tailwind.config.js file 을 root project 에 생성합니다. 

purge, theme, variants, plugins 등을 설정합니다. 

```js
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./public/**/*.html", "./src/**/*.vue"],
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
      ],
    },
  },
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Gothic A1", "sans-serif"],
    },
  },
  variants: {},
  plugins: [],
}
```



### Using Tailwind with PostCSS

프로젝트 루트에 postcss.config.js 을 생성하고 설정을 추가하여 postcss 에서 tailwindcss 사용을 할 수 있습니다.

```js
module.exports = {
  plugins: [
    // ...
    require("tailwindcss"),
    require("autoprefixer"),
    // ...
  ],
}
```

### Add tailwind into main.js
main.js 에 css 파일을 가져오기 합니다. 

```js
import Vue from "vue";
import App from "./App.vue";

import "@/css/tailwind.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```