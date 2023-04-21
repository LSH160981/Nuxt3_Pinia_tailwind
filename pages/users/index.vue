<template>
  <h2>users-默认显示的组件</h2>
  <CreateOrEdit aaa="123456" :title="title"></CreateOrEdit>
</template>

<script setup>
import CreateOrEdit from "./create-or-edit.vue";
const title = ref("faster you can");

// useFetch("/api/aaa").then((res) => {
//   // 访问自定义服务器 默认路径与app.vue 同级的server\api\aaa.ts 的文件
//   console.log(res.data.value);
// });
// useFetch("/api/ddd", {
//   method: "POST",
//   headers: {
//     token: "hufasd-gebhhrgh4t4a1afwaes",
//   },
//   body: {
//     account: "chatgpt-newbing",
//     password: "666000888",
//   },
// }).then((res) => {
//   console.log(res.data.value);
// });
</script>

<style scoped></style>
