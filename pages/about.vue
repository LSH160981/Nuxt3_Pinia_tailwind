<template>
  <div>
    <div class="w-15 flex justify-center items-center gap-2">
      <h1 class="text-center text-3xl text-violet-600 py-4">前端那些事情</h1>
      <button class="btn btn-warning" @click="refresh">refresh</button>
    </div>
    <div class="flex flex-row justify-center">
      <img src="/aaa.jpg" width="200" />
      <!-- <img src="@/public/aaa.jpg" width="200" /> -->
      <img src="~/assets/s.png" class="ml-3" width="275" />
      <!-- <img src="@/assets/s.png" width="200" /> -->
    </div>
    <div class="rounded-xl mt-2 p-3 text-center bg-violet-300 mx-40">
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script setup>
/*
默认情况下，useFetch 会阻止导航，直到解析其异步处理程序完毕
当然 useFetch 有个配置项 Lazy 设置为true 跟 useLazyFetch 一样的
  没有Lazy 页面会等 所有的请求数据 都准备好才会 进行页面渲染 
    当用户的网路较差 整个页面就会先停留在上一个页面 数据都回来了才会渲染页面
    如果是首页就是空白
  有Lazy的区别是先把 静态的页面先渲染出来 
    发起的请求 数据返回的比较慢 静态的结构会先出来 就不会停留在上一个页面
    插值语法的HTML结构就不会被渲染出来
*/
// const { data } = useLazyFetch("https://v.api.aa1.cn/api/tiangou/index.php");
// const { data } = useFetch("https://v.api.aa1.cn/api/tiangou/index.php");

// useFetch("https://v.api.aa1.cn/api/tiangou/index.php", {
//   method: "GET",
// }).then((res) => {
//   console.log(res);
// });

import { ref } from "vue";

const result = ref("");
const { data, pending, refresh } = await useFetch("https://v.api.aa1.cn/api/tiangou/index.php", {
  method: "GET",
  // lazy: true,
  onRequest({ resquest, options }) {
    // console.log(options);
  },
  onResponse({ resquest, options, response }) {
    result.value = response._data.replace(/\<\/?[a-z]+\>/g, "");
    console.log("一秒后刷新文字");
  },
});
if (!pending.value) {
  setTimeout(() => {
    refresh();
  }, 2000);
}

// useAsyncData("舔狗日记", () =>
//   $fetch("https://v.api.aa1.cn/api/tiangou/index.php", {
//     method: "GET",
//   })
// ).then((res) => {
//   console.log(res);
// });

// const result = await useAsyncData("舔狗日记", () =>
//   $fetch("https://v.api.aa1.cn/api/tiangou/index.php")
// );
// console.log(result.data.value);
</script>
