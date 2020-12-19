<template>
  <div class="lg:grid grid-cols-5">
    <nuxt-child />
    <div class="col-span-1 text-gray-800 sticky">
      <div
        class="text-2xl p-2 bg-gray-800 text-gray-100 shadow rounded-lg font-bold mt-4"
      >
        カテゴリー
      </div>
      <ul class="list-none">
        <nuxt-link
          tag="li"
          class="border-b-2 text-2xl m-1 ml-4"
          v-for="category in categories"
          :to="`/category/${category.id}`"
          :key="category.id"
        >
          {{ category.name }}
        </nuxt-link>
      </ul>
      <div
        class="text-2xl p-2 bg-gray-800 text-gray-100 shadow rounded-lg font-bold mt-4"
      >
        最新記事
      </div>
      <ul class="list-none">
        <nuxt-link
          tag="li"
          class="border-b-2 text-2xl m-1 ml-4"
          v-for="category in contents"
          :to="`/category/${category.id}`"
          :key="category.id"
        >
          {{ category.title }}
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const { contents: categories } = await $axios.$get(
      process.env.API_URL + "categories?limit=100",
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );

    const { contents } = await $axios.$get(
      process.env.API_URL + "inaridiy?limit=3",
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );

    return { categories, contents };
  },
};
</script>