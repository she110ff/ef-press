module.exports = {
  host: "localhost",
  port: 8888,
  title: "Knowledge Share",
  description: "Just playing around",
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Languages",
        items: [
          { text: "JavaScript", link: "/languages/python/" },
          { text: "Python", link: "/languages/python/" },
        ]
      },
      {
        text: "Frameworks",
        ariaLabel: "Language Menu",
        items: [
          { text: "VueJS", link: "/frameworks/vuejs/" },
          { text: "Django", link: "/frameworks/django/" },
          { text: "NestJS", link: "/frameworks/nestjs/" },
        ],
      },
      {
        text: "Sub Frameworks",
        items: [
          { text: "NuxtJS", link: "/subframeworks/nuxtjs/" },
          { text: "VuePress", link: "/subframeworks/vuepress/" },
          { text: "Django-REST", link: "/subframeworks/django-rest/" },
          ]
      },
      {
        text: "Methodology",
        items: [
          { text: "Clean Architecture", link: "/methodology/clean-arch/" },
          { text: "Test Driven Development", link: "/methodology/clean-arch/" },
          { text: "Sprint(Agile)", link: "/methodology/clean-arch/" },
        ],
      },
      {
        text: "Tool&Module",
        items: [
          { text: "Git", link: "/tool-module/git/" },
          { text: "VSCode", link: "/tool-module/vscode/" },
          { text: "Vim", link: "/tool-module/vim/" },
          { text: "Pandas", link: "/tool-module/pandas/" },
        ],
      },
      {
        text: "Boilerplate",
        items: [
          { text: "NuxtJS-Django", link: "/practice/nuxtjs-django/" }
        ],
      },
      {
        text: "Practice",
        items: [
          { text: "FinDev", link: "/practice/nuxtjs-django/" }
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
            "tests",
            "url-dispatcher",
            "errors",
          ],
        },
      ],
      "/subframeworks/nuxtjs/": [
        {
          title: "NuxtJS",
          collapsable: false,
          children: ["", "nuxt-install", "directory-structure", "concept"],
        },
      ],
      "/subframeworks/django-rest/": [
        {
          title: "Django REST",
          collapsable: false,
          children: [
            "",
            "tutorial-1-serialization",
            "tutorial-2-request",
            "tutorial-3-classbase",
            "tutorial-4-authentication",
            "tutorial-5-relationship",
            "tutorial-6-viewsets",
            "generic-view",
            "viewsets",
            "serializer",
            "serializer-relations",
          ],
        },
      ],
      "/methodology/clean-arch/": [
        {
          title: "Clean Architecture",
          collapsable: false,
          children: ["", "in-django-product"],
        },
      ],
      "/tool-module/git/": [
        {
          title: "Git",
          collapsable: false,
          children: ["", "git-flow", "ssh"],
        },
      ],
      "/tool-module/vscode/": [
        {
          title: "VSCode",
          collapsable: false,
          children: ["", "install", "concept"],
        },
      ],
      "/tool-module/pandas/": [
        {
          title: "Pandas",
          collapsable: false,
          children: ["", "install"],
        },
      ],
      "/tool-module/vim/": [
        {
          title: "Vim",
          collapsable: false,
          children: ["", "install"],
        },
      ],
      "/practice/nuxtjs-django/": [
        {
          title: "NuxtJS & Django",
          collapsable: false,
          children: ["", "user-story", "usecase", "ui-interface"],
        },
      ],

      
      // fallback
      "/": ["" /* / */],
    },
  },
  plugins: [["@vuepress/back-to-top", true]],
};
