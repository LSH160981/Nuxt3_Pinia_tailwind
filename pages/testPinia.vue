<template>
  <div class="p-4 text-center">
    <h2>测试Pinia</h2>
    <h2>Pinia_state:{{ apple.food }}</h2>
    <h2>Pinia_state_num:{{ apple.foodNum }}</h2>
    <button class="btn btn-outline btn-info" @click="apple.addAppleNum()">+1</button>
    <el-button class="ml-2" type="primary" @click="handlerClick">element-ui</el-button>
    <br />
    <p>{{ random.random_data }}</p>
    <el-button type="warning" @click="random.get_random()">refresh</el-button>
  </div>
</template>

<script setup>
const apple = useAppleStore();
const handlerClick = () => {
  ElMessage.success("element-ui 引入成功");
};
const random = useRandomStore();
random.get_random();
</script>

<style scoped></style>
