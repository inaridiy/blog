<template>
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1
        class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
      >
        カテゴリー一覧
      </h1>
    </div>
    <ul>
      <nuxt-link
        tag="li"
        class="border-b-2 text-2xl"
        v-for="category in contents"
        :to="`/category/${category.id}`"
        :key="category.id"
      >
        {{ category.name }}
      </nuxt-link>
    </ul>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const { contents } = await $axios.$get(
      process.env.API_URL + "categories?limit=100",
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return { contents };
  },
};
</script>