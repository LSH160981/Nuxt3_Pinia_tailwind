<template>
  <h2>课程号： {{ route.params.id }}</h2>
</template>

<script setup>
const route = useRoute();
useHead({
  titleTemplate: (titleChunk) => {
    return route.params.id;
  },
});
</script>

<style scoped></style>
