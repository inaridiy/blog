<template>
  <main class="container mx-auto px-4 lg:px-8">
    <h1 class="text-6xl items-center justify-between">{{ title }}</h1>
    <p class="publishedAt">{{ date }}</p>
    <img
      :src="image.url"
      v-if="image"
      alt=""
      loading="lazy"
      class="bg-gray-300 w-full border-2 border-gray-400 rounded-lg shadow-md bg-cover bg-center"
    />
    <div
      class="content w-full prose sm:prose-sm lg:prose-lg max-w-none"
      v-html="body_html"
    ></div>
  </main>
</template>
<script>
export default {
  async asyncData({ params, $axios, $md }) {
    const { title, publishedAt, body, image } = await $axios.$get(
      `${process.env.API_URL}production/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const body_html = $md.render(body);

    return { title, publishedAt, body, body_html, image };
  },
  computed: {
    date: function () {
      const date = new Date(this.publishedAt).toLocaleDateString("ja-jp");
      return date;
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>