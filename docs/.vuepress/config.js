module.exports = {
  host: "localhost",
  title: "EARL FLEX",
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
          { text: "VueJS", link: "/learning/vuejs/" },
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
      "/learning/vuejs/": [
        {
          title: "VueJS",
          collapsable: false,
          children: ["", "install", "concept"],
        },
      ],
      "/learning/nuxtjs/": [
        {
          title: "NuxtJS",
          collapsable: false,
          children: ["", "nuxt-install", "concept"],
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
