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
    const { title, publishedAt, body, image, id } = await $axios.$get(
      `${process.env.API_URL}production/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const body_html = $md.render(body);

    return { title, publishedAt, body, body_html, image, id };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.body.substr(0, 100)}...`,
        },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "og:title", property: "og:title", content: this.title },
        {
          hid: "og:description",
          property: "og:description",
          content: `${this.body.substr(0, 100)}...`,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.image
            ? this.image.url
            : `${process.env.baseUrl}/ogp/${this.id}.png`,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
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