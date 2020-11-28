(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{397:function(e,t,a){"use strict";a.r(t);var n=a(25),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("Nuxt is a progressive framework based on Vue.js to create modern web applications. It is based on Vue.js official libraries (vue, vue-router and vuex) and powerful development tools (webpack, Babel and PostCSS). Nuxt's goal is to make web development powerful and performant with a great developer experience in mind.")]),e._v(" "),a("h2",{attrs:{id:"what-is-nuxtjs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-is-nuxtjs"}},[e._v("#")]),e._v(" What is NuxtJS?")]),e._v(" "),a("p",[e._v("Nuxt is a framework designed to give you a strong architecture following official Vue guidelines. Incrementally adoptable, it can be used to create everything from static landing pages to complex enterprise ready web applications.")]),e._v(" "),a("p",[e._v("Versatile by nature, it supports different targets (server, serverless or static) and server side rendering is switchable.")]),e._v(" "),a("p",[e._v("Extendable with a strong module ecosystem, it makes it easy to connect your REST or GraphQL endpoints, favorite CMS, CSS frameworks and more. PWA and AMP support is only a module away from your Nuxt project.")]),e._v(" "),a("p",[e._v("NuxtJS is the backbone of your Vue.js project, giving structure to build your project with confidence while being flexible.")]),e._v(" "),a("h2",{attrs:{id:"features"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#features"}},[e._v("#")]),e._v(" Features")]),e._v(" "),a("p",[e._v("Write Vue Files (*.vue)\nAutomatic Code Splitting\nServer-Side Rendering\nPowerful Routing System with Asynchronous Data\nStatic File Serving\nES2015+ Transpilation\nBundling and minifying of your JS & CSS\nManaging head element (title, meta, etc.)\nHot module replacement in Development\nPre-processor: Sass, Less, Stylus, etc.\nHTTP/2 push headers ready\nExtending with Modular architecture")]),e._v(" "),a("h2",{attrs:{id:"how-it-works"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works"}},[e._v("#")]),e._v(" How it Works")]),e._v(" "),a("p",[e._v("Nuxt.js includes the following to create a rich web application development:")]),e._v(" "),a("p",[e._v("Vue 2\nVue Router\nVuex (included only when using the store option)\nVue Server Renderer (excluded when using mode: 'spa')\nVue Meta\nA total of only 57kB min+gzip (60kB with Vuex).")]),e._v(" "),a("p",[e._v("Under the hood we use webpack with vue-loader and babel-loader to bundle, code-split and minify your code.")]),e._v(" "),a("h2",{attrs:{id:"schema"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#schema"}},[e._v("#")]),e._v(" Schema")]),e._v(" "),a("p",[e._v("This schema shows what is called by Nuxt.js when the server is called or when the user navigates through the app via 'nuxt-link':")]),e._v(" "),a("p",[e._v("nuxt-schema")]),e._v(" "),a("h2",{attrs:{id:"server-rendered-universal-ssr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#server-rendered-universal-ssr"}},[e._v("#")]),e._v(" Server Rendered (Universal SSR)")]),e._v(" "),a("p",[e._v("You can use Nuxt.js as a framework to handle all the UI rendering of your project.")]),e._v(" "),a("p",[e._v("When launching nuxt, it will start a development server with hot-reloading and Vue Server Renderer configured to automatically server-render your application.")]),e._v(" "),a("h2",{attrs:{id:"single-page-applications-spa"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#single-page-applications-spa"}},[e._v("#")]),e._v(" Single Page Applications (SPA)")]),e._v(" "),a("p",[e._v("If, for any reason, you prefer not to use server side rendering or need static hosting for your applications, you can simply use SPA mode using nuxt --spa. In combination with the generate feature, it gives you a powerful SPA deployment mechanism without the need to use a Node.js runtime or any special server handling.")]),e._v(" "),a("p",[e._v("Take a look at the commands to learn more about usage.")]),e._v(" "),a("p",[e._v("If you already have a server, you can plug in Nuxt.js by using it as a middleware. There is no restriction at all when using Nuxt.js for developing your Universal Web Applications. See the Using Nuxt.js Programmatically guide.")]),e._v(" "),a("h2",{attrs:{id:"static-generated-pre-rendering"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#static-generated-pre-rendering"}},[e._v("#")]),e._v(" Static Generated (Pre Rendering)")]),e._v(" "),a("p",[e._v("The big innovation of Nuxt.js comes with the nuxt generate command.")]),e._v(" "),a("p",[e._v("When building your application, it will generate the HTML for every one of your routes and store it in a file.")]),e._v(" "),a("p",[e._v("Static Site Generation with Nuxt.js by vueschool\nStatic Site Generation with Nuxt.js\nLearn how to generate static websites (pre rendering) to improve both performance and SEO while eliminating hosting costs.")]),e._v(" "),a("p",[e._v("Video courses made by VueSchool to support Nuxt.js development.")]),e._v(" "),a("p",[e._v("For example, the following file structure:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("-| pages/\n----| about.vue\n----| index.vue\n")])])]),a("p",[e._v("Will generate:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("-| dist/\n----| about/\n------| index.html\n----| index.html\n")])])]),a("p",[e._v("With this, you can host your generated web application on any static hosting!")]),e._v(" "),a("p",[e._v("The best example is this website. It is generated and hosted on Netlify, see our source code or How to deploy Nuxt.js to Netlify from Vue School.")]),e._v(" "),a("p",[e._v("We don't want to manually generate the application every time we update the docs repository, it triggers a hook to Netlify which:")]),e._v(" "),a("p",[e._v("Clones the nuxtjs.org repository\nInstalls the dependencies via npm install\nRuns npm run generate\nServes the dist directory\nWe now have an automated Static Generated Web Application 😃")]),e._v(" "),a("p",[e._v("We can go further by thinking of an e-commerce web application made with nuxt generate and hosted on a CDN. Every time a product is out of stock or back in stock, we regenerate the web app. But if the user navigates through the web app in the meantime, it will be up to date thanks to the API calls made to the e-commerce API. No need to have multiple instances of a server + a cache any more!")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);