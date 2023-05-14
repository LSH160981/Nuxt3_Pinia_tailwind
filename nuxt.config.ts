// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 为了在 CF上deploy  更改输出文件  CF 的默认脚本把.开头的文件视为隐藏文件而不去执行
  // nitro: {
  //   output: {
  //     dir: "../output",
  //     serverDir: "../output/server",
  //     publicDir: "../output/public",
  //   },
  // },
  // 打包后 不会产出.map文件
  sourcemap: {
    // 前端后端 都要配置
    client: false,
    server: false,
  },
  runtimeConfig: {
    // 这里定义的东西是可见的【文档是这么写的】
    isServeConst: true,
    privateConst: "This is a server cosnt",
    public: {
      publicConst: "This is a public const",
    },
  },
  app: {
    head: {
      // title: "My App", // 全局的标题
      // 在head中设置关键字 有利于SEO
      meta: [
        { name: "keywords", content: "lSH的一次练习" },
        { name: "description", content: "练习,Nuxt3,Vue3" },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // pinia plugin
    "@pinia/nuxt",
    // element-ui plugin
    "@element-plus/nuxt",
    // Simple usage eslint
    // "@nuxtjs/eslint-module",
  ],

  // 自定义文件夹 nuxt自动导入
  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  // 针对不用的页面 采用不同的渲染模式
  routeRules: {
    // prerender 为true 表示 build后直接就是一个静态的html
    "/tailwindDemo/**": { prerender: true },
    // ssr 为false 这个文件不用在服务器上渲染，只在客户端渲染
    "/about": { ssr: false },

    // 这个是路由重定向 凡是访问 【/demo】下的任何路径 都会跳到指定页面
    // 用处：已经宣传出去的地址(不能改的) 就把这个地址重定向去特定的路由就好了
    "/demo/**": { redirect: "/" },

    // 对所有的页面添加一个 响应头
    "/**": { headers: { "cache-control": "s-maxage=114514" } },
  },
  // 这个配置是 element-ui 单独的配置
  elementPlus: {
    /** Options */
  },
});
