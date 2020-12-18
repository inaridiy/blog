<template>
  <main class="container mx-auto px-4 lg:px-8">
    <h1 class="text-6xl items-center justify-between">{{ title }}</h1>
    <div class="flex">
      <p class="publishedAt">{{ date }}</p>
      <div class="items-center justify-between">
        <div
          v-for="ele in category"
          :key="ele.id"
          class="mx-2 rounded-lg px-1 bg-gray-800 text-gray-100"
        >
          {{ ele.name }}
        </div>
      </div>
    </div>
    <div
      class="content w-full prose sm:prose-sm lg:prose-lg max-w-none"
      v-html="body_html"
    ></div>
  </main>
</template>
<script>
export default {
  async asyncData({ params, $axios, $md }) {
    const { title, publishedAt, body, category } = await $axios.$get(
      `${process.env.API_URL}inaridiy/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const body_html = $md.render(body);

    return { title, publishedAt, body, body_html, category };
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