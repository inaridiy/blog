<template>
  <div class="pt-16">
    <TheHeader />
    <main>
      <Nuxt />
    </main>
  </div>
</template>
<script>
export default {
  async mounted() {
    const music = await new Audio("/bgm/ww.mp3");
    music.play();
  },
};
</script>