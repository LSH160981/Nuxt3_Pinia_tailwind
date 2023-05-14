<template>
  <div class="max-w-[100vw]">
    <div class="flex justify-center">
      <el-button type="primary" @click="handlerClick">element-ui</el-button>
    </div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in imgArr" :key="item.slice(-5)" class="w-[740px]">
        <img :src="item" class="m-auto" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
const handlerClick = () => {
  ElMessage.success("element-ui 引入成功");
};

const imgArr = ref([]);
useFetch("https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata").then((res) => {
  if (res.data.value.meta.status == 200) {
    // console.log(res.data.value.message[0].image_src);
    res.data.value.message.forEach((item) => {
      // console.log();
      imgArr.value.push(item.image_src);
    });
  }
});

// 下面这段代码用来测试 provide inject 的    provide的组件 是app.vue
const testConst = ref(1);
// setInterval(() => {
//   testConst.value++;
// }, 1000);

const message = inject("message");
watch(
  testConst,
  () => {
    message("deep Components transfer arguments", testConst.value);
  },
  { immediate: true }
);
</script>

<style scoped></style>
