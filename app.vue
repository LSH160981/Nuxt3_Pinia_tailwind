<template>
  <div class="select-none">
    <h1 class="bg-pink-400 p-5 text-center rounded-3xl text-4xl my-1 mx-2">{{ hi }}</h1>
    <nav class="py-3 text-center flex justify-center gap-2 text-red-500 text-xl">
      <nuxt-link
        active-class="rounded bg-blue-400 text-amber-400 "
        v-for="item in routeNav"
        :key="item.address"
        :to="item.address"
        >{{ item.content }}</nuxt-link
      >
    </nav>
    <nuxt-page></nuxt-page>
  </div>
</template>

<script setup>
const routeNav = [
  { address: "/", content: "首页" },
  { address: "/users", content: "用户" },
  { address: "/roles", content: "角色" },
  { address: "/about", content: "关于" },
  { address: "/testpinia", content: "测试Pinia" },
  { address: "/testEle", content: "测试Ele" },
  { address: "/tailwindDemo/tailwindDemo", content: "练习tailwind" },
];

// 在 nuxt中 ref 不在需要引入 下面这句话 就能直接使用 ref computed 。。。
// import { ref } from "vue";
const hi = ref("你好 Nuxt!");
onMounted(() => {});

useHead({
  // titleChunk 这个形参数是 看 每一个组件有没有设置标题
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 学习Nuxt3~` : `学习Nuxt3~`;
  },
  script: [
    {
      // src: "https://www.baidu.com/test.js",
      // body: true,
      /**
       * 这个body == false 【默认不写就是false】 外部引入的 js 就是放在的head头部
       * body == true 外部引入的 js 放在 body的最下面
       * < body>
       * ...
       * <script src="...">< /script>
       * </body>
       */
    },
  ],
});

// 下面这段代码用来测试 provide inject 的    inject的组件是 testEle.vue
const testfun = function (aaa, testConst) {
  console.log(`app-${aaa}` + testConst);
};
provide(/* 注入名 */ "message", /* 值 */ testfun);
</script>
