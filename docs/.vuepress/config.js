module.exports = {
  host: "localhost",
  title: "Knowledge Share",
  description: "Just playing around",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Foo", link: "/foo/" },
      { text: "Bar", link: "/bar/" },
      {
        text: "Learning",
        ariaLabel: "Language Menu",
        items: [
          { text: "VSCode", link: "/learning/vscode/" },
          { text: "Git", link: "/learning/git/" },
          { text: "VueJS", link: "/learning/vuejs/" },
          { text: "Python", link: "/learning/python/" },
          { text: "Django", link: "/learning/django/" },
          { text: "NuxtJS", link: "/learning/nuxtjs/" },
          { text: "NestJS", link: "/learning/nestjs/" },
        ],
      },
      { text: "External", link: "https://google.com" },
    ],

    sidebar: {
      "/foo/": [
        ["", "foo"] /* /foo/ */,
        ["one", "onne"] /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],
      "/learning/vscode/": [
        {
          title: "VSCode",
          collapsable: false,
          children: ["", "install", "concept"],
        },
      ],
      "/learning/git/": [
        {
          title: "Git",
          collapsable: false,
          children: ["", "ssh"],
        },
      ],
      "/learning/vuejs/": [
        {
          title: "VueJS",
          collapsable: false,
          children: ["", "install", "concept"],
        },
      ],
      "/learning/python/": [
        {
          title: "Python",
          collapsable: false,
          children: ["","coding-convention", "variable", "number", "string", "list", "control-flow", "data-structures", "function", "class", "error-exception", "standard-lib"],
        },
      ],
      "/learning/django/": [
        {
          title: "Django",
          collapsable: false,
          children: ["", "python-install", "python-venv", "django-install", "django-database", "errors"],
        },
      ],
      "/learning/nuxtjs/": [
        {
          title: "NuxtJS",
          collapsable: false,
          children: ["", "nuxt-install", "directory-structure", "concept"],
        },
      ],
      "/learning/nestjs/": [
        {
          title: "NestJS",
          collapsable: false,
          children: ["", "nest-install", "controllers"],
        },
      ],

      "/bar/": [
        {
          title: "Group 1", // required
          path: "/bar/", // optional, link of the title, which should be an absolute path and must exist
          children: [["/bar/three", "three"]],
        },
        {
          title: "Group 2", // required
          path: "/bar/four/", // optional, link of the title, which should be an absolute path and must exist
          children: [
            ["/bar/four/five", "five"],
            {
              title: "subGroup 2", // required
              path: "/bar/", // optional, link of the title, which should be an absolute path and must exist
              children: [
                ["/bar/three", "three"],
                ["/bar/four/", "four"],
              ],
            },
          ],
        },
      ],

      // fallback
      "/": ["" /* / */],
    },
  },
  plugins: [["@vuepress/back-to-top", true]],
};
