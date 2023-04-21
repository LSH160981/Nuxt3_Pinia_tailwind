<template>
  <h2>App默认显示的文件</h2>
  <DeepDialog />
  <GlobalTest />
  <!-- this component will only be rendered on client-side -->
  <!-- <ClientOnly></ClientOnly> -->
</template>

<script setup>
useHead({
  title: "首页",
});

const runTimeConfig = useRuntimeConfig();
// console.log(runTimeConfig.privateConst);
// console.log(runTimeConfig.public.publicConst);
// if (!runTimeConfig.isServeConst) {
//   // console.log("在服务器上输出文字");
//   console.log("在客户端输出文字");
// }
</script>

<style scoped></style>
