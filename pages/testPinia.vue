<template>
  <div class="p-4 text-center">
    <h2>测试Pinia</h2>
    <h2>Pinia_state:{{ apple.food }}</h2>
    <h2>Pinia_state_num:{{ apple.foodNum }}</h2>
    <button class="btn btn-outline btn-info" @click="apple.foodNum++">+1</button>
    <br />
    <p>{{ random.random_data }}</p>
    <el-button type="warning" @click="random.get_random()">refresh</el-button>
  </div>
</template>

<script setup>
const apple = useAppleStore();
// 这是一个仓库(Pinia) 在store
const random = useRandomStore();
if (!random.random_data) {
  random.get_random();
}
</script>

<style scoped></style>
