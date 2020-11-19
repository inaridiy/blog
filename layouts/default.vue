<template>
  <div class="pt-16">
    <TheHeader />

    <main @click.stop="back">
      <Nuxt />
    </main>
  </div>
</template>
<script>
</script>
<style scoped>
* {
  font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", Meiryo, sans-serif;
}
</style>
