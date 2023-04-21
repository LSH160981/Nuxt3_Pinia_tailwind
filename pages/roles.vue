<template>
  <div class="text-center">
    <h2>roles - 角色</h2>
    <nav class="flex justify-center gap-3 text-xl p-3">
      <nuxt-link active-class="rounded bg-violet-700 text-amber-400" to="/roles/admin"
        >超级管理员</nuxt-link
      >
      <nuxt-link active-class="rounded bg-violet-700 text-amber-400" to="/roles/other"
        >其他人</nuxt-link
      >
    </nav>
    <div class="bg-amber-400 rounded-2xl mx-16 p-3 text-2xl">
      <nuxt-page></nuxt-page>
    </div>
    <div class="mt-3">
      <div>composables-Vuex 数据:{{ counter }}</div>
      <div>Pinia 数据:{{ apple.foodNum }}</div>
    </div>
  </div>
</template>

<script setup>
const counter = useCounter();
const apple = useAppleStore();
</script>
