<template>
  <div class="main">
    <hr />
    <h2>create-or-edit</h2>
    <h4>{{ aaa }}</h4>
    <h4>{{ title }}</h4>
    <hr />
    <p>composables-Vuex:{{ counter }}</p>
    <button class="btn btn-primary border" @click="counter++">+1</button>
    <button class="btn btn-primary border ml-2" @click="addCounter">+2</button>
  </div>
</template>

<script setup>
const counter = useCounter();
// console.log(counter);
const addCounter = () => {
  // 这里修改 也会对 state中的数据有影响
  counter.value += 2;
};

// 因为我们使用了 语法糖 传递来的参数 必须使用 defineProps 接收
defineProps({
  aaa: {
    type: String, // 类型
    default: "没有传参", // 默认值
    // 当然 default required 没有必要同时存在
    required: true, // 必须传参
  },
  title: String,
});
</script>

<style scoped>
.main {
  background-color: rgba(0, 255, 255, 0.355);
}
</style>
