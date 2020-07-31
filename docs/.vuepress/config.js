module.exports = {
  host: "localhost",
  title: "Knowledge Share",
  description: "Just playing around",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Languages",
        items: [{ text: "Python", link: "/languages/python/" }],
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
      {
        text: "Tool & Module",
        items: [
          { text: "Django-REST", link: "/tool-module/django-rest/" },
          { text: "Clean Architecture", link: "/tool-module/clean-arch/" }
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
      "/tool-module/django-rest/": [
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
      "/tool-module/clean-arch/": [
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

      // fallback
      "/": ["" /* / */],
    },
  },
  plugins: [["@vuepress/back-to-top", true]],
};
