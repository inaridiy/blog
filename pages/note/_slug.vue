<template>
  <main class="container mx-auto px-4 lg:px-8">
    <h1 class="text-6xl items-center justify-between">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div
      class="content w-full prose sm:prose-sm lg:prose-lg max-w-none"
      v-html="$md.render(body)"
    ></div>
  </main>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    const { title, publishedAt, body } = await $axios.$get(
      `${process.env.API_URL}inaridiy/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );

    return { title, publishedAt, body };
  },
};
</script>