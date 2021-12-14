<script setup lang="ts">
const { data } = await useAsyncData("hello", () =>
  $fetch("/api/article?id=m6p13qkyi")
);
</script>
<template>
  <article class="mx-auto container px-2 md:px-4">
    <div class="znc" v-html="data.html"></div>
  </article>
</template>
