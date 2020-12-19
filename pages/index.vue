<template>
  <div
    class="container border m-8 mx-auto rounded-lg text-gray-800 overflow-hidden shadow-lg"
  >
    <h1 class="text-2xl md:text-5xl text-center font-semibold title mt-4">
      いなりの開発記録
    </h1>

    <div
      class="flex mx-auto w-56 font-semibold text-xl items-center border-b-2"
    >
      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        About
      </NuxtLink>
      <NuxtLink to="/note" class="inline-block mt-0 hover:text-teal-400 mr-4">
        Note
      </NuxtLink>
      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        Production
      </NuxtLink>
    </div>

    <div class="title-text text-xl font-semibold text-center mt-8 p-4 relative">
      常に新しい技術に触れて作りたいものを作りたい。<br />
      そんないなりの日々の開発や作品をまとめたサイトです。
    </div>
    <h2 class="font-semibold text-3xl text-center my-8">最新記事</h2>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <Thecard
        v-for="content in contents"
        :key="content.id"
        :content="content"
      />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const { contents } = await $axios.$get(
      process.env.API_URL + "inaridiy?limit=3",
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return { contents };
  },
  head() {
    return {
      titleTemplate: null,
      title: "いなりの開発記録",
    };
  },
};
</script>
<style lang="scss" scoped>
</style>


