module.exports = {
  host: "localhost",
  title: "Knowledge Share",
  description: "Just playing around",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Languages", 
        items: [
          { text: "Python", link: "/languages/python/" },
        ],
      },
      {
        text: "Frameworks",
        ariaLabel: "Language Menu",
        items: [
          { text: "VSCode", link: "/frameworks/vscode/" },
          { text: "Git", link: "/frameworks/git/" },
          { text: "VueJS", link: "/frameworks/vuejs/" },
          { text: "Django", link: "/frameworks/django/" },
          { text: "NuxtJS", link: "/frameworks/nuxtjs/" },
          { text: "NestJS", link: "/frameworks/nestjs/" },
        ],
      },
      { text: "External", link: "https://google.com" },
    ],

    sidebar: {
      
      "/languages/python/": [
        {
          title: "Python",
          collapsable: false,
          children: [
            "",
            "python-install",
            "python-venv",
            "coding-convention",
            "variable",
            "number",
            "string",
            "list",
            "control-flow",
            "data-structures",
            "function",
            "module",
            "class",
            "dunder",
            "error-exception",
            "standard-lib",
          ],
        },
      ],
      "/frameworks/vscode/": [
        {
          title: "VSCode",
          collapsable: false,
          children: ["", "install", "concept"],
        },
      ],
      "/frameworks/git/": [
        {
          title: "Git",
          collapsable: false,
          children: ["", "ssh"],
        },
      ],
      "/frameworks/vuejs/": [
        {
          title: "VueJS",
          collapsable: false,
          children: ["", "install", "concept"],
        },
      ],
      "/frameworks/django/": [
        {
          title: "Django",
          collapsable: false,
          children: [
            "",
            "overview",
            "django-install",
            "django-database",
            "first-app-1",
            "first-app-2",
            "model",
            "how-to-query",
            "queryset",
            "lookup",
            "first-app-3",
            "first-app-4",
            "first-app-5",
            "first-app-6",
            "first-app-7",
            "url-dispatcher",
            "errors",
          ],
        },
      ],
      "/frameworks/nuxtjs/": [
        {
          title: "NuxtJS",
          collapsable: false,
          children: ["", "nuxt-install", "directory-structure", "concept"],
        },
      ],
      "/frameworks/nestjs/": [
        {
          title: "NestJS",
          collapsable: false,
          children: ["", "nest-install", "controllers"],
        },
      ],


      // fallback
      "/": ["" /* / */],
    },
  },
  plugins: [["@vuepress/back-to-top", true]],
};
