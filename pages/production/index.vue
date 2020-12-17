<template>
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1
        class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
      >
        Note
      </h1>
      <p class="lg:w-1/2 w-full leading-relaxed text-base">
        僕の日常とか、開発とかを適当に書く感じのノート
      </p>
    </div>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <Thecard2
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
      process.env.API_URL + "production?limit=15",
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return { contents };
  },
};
</script>