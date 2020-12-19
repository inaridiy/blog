<template>
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1
        class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
      >
        {{ name }}の記事一覧
      </h1>
    </div>
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
  async asyncData({ $axios, params }) {
    const { name } = await $axios.$get(
      `${process.env.API_URL}categories/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const { contents } = await $axios.$get(
      process.env.API_URL + "inaridiy?limit=100",
      {
        params: {
          filters: `category[contains]${params.slug}`,
        },
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return { contents, name };
  },
};
</script>