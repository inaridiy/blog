<template>
  <div
    class="container max-w-screen-sm border m-8 p-8 mx-auto rounded-lg text-gray-800 overflow-hidden shadow-lg"
  >
    <h1 class="text-5xl text-center font-semibold">いなりの開発記録</h1>

    <div
      class="flex mx-auto w-56 font-semibold text-gray-800 text-xl items-center"
    >
      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        About
      </NuxtLink>

      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        Note
      </NuxtLink>
      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        Production
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    const data = await this.$axios.$get(
      process.env.API_URL + "inaridiy?limit=100",
      { headers: { "X-API-KEY": process.env.API_KEY } }
    );
    console.log(data);
  },
};
</script>


