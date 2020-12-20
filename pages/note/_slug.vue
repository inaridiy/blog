<template>
  <main class="container mx-auto px-4 lg:px-8 col-span-4">
    <div class="flex">
      <nuxt-link
        v-if="prev"
        :to="`/note/${prev.id}`"
        class="w-full sm:w-1/2 bg-gray-300 p-2 m-2 rounded-md text font-medium text-lg shadow"
        >前の記事:{{ prev.title }}</nuxt-link
      >
      <nuxt-link
        v-if="next"
        :to="`/note/${next.id}`"
        class="w-full md:w-1/2 bg-gray-300 p-2 m-2 rounded-md font-medium text-lg shadow"
        >次の記事:{{ next.title }}</nuxt-link
      >
    </div>
    <h1 class="text-6xl items-center justify-between">{{ title }}</h1>
    <div class="flex">
      <p class="publishedAt">{{ date }}</p>
      <div class="items-center justify-between">
        <nuxt-link
          v-for="ele in category"
          :key="ele.id"
          :to="`/category/${ele.id}`"
          class="mx-2 rounded-lg px-1 bg-gray-800 text-gray-100"
        >
          {{ ele.name }}
        </nuxt-link>
      </div>
    </div>

    <div
      class="content w-full prose sm:prose-sm lg:prose-lg max-w-none"
      v-html="body_html"
    ></div>
    <div class="flex">
      <nuxt-link
        v-if="prev"
        :to="`/note/${prev.id}`"
        class="w-full md:w-1/2 bg-gray-300 p-2 m-2 rounded-md text font-medium text-lg shadow"
        >前の記事:{{ prev.title }}</nuxt-link
      >
      <nuxt-link
        v-if="next"
        :to="`/note/${next.id}`"
        class="w-full md:w-1/2 bg-gray-300 p-2 m-2 rounded-md font-medium text-lg shadow"
        >次の記事:{{ next.title }}</nuxt-link
      >
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ params, $axios, $md, $nuxt }) {
    const { title, publishedAt, body, category, id } = await $axios.$get(
      `${process.env.API_URL}inaridiy/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const { contents: next_content } = await $axios.$get(
      `${process.env.API_URL}inaridiy/`,
      {
        params: {
          limit: 1,
          fields: "id,title,publishedAt",
          orders: "publishedAt",
          filters: `publishedAt[greater_than]${publishedAt}`,
        },
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const { contents: prev_content } = await $axios.$get(
      `${process.env.API_URL}inaridiy/`,
      {
        params: {
          limit: 1,
          fields: "id,title,publishedAt",
          orders: "-publishedAt",
          filters: `publishedAt[less_than]${publishedAt}`,
        },
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const prev = prev_content[0],
      next = next_content[0];
    const body_html = $md.render(body);

    return {
      title,
      publishedAt,
      body,
      body_html,
      category,
      prev,
      next,
      id,
    };
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
          content: `${process.env.baseUrl}/ogp/${this.id}.png`,
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
<style lang="scss" scoped>
.li_h1,
.li_h2 {
  @apply list-decimal text-xl ml-2;
}
.li_h3 {
  @apply list-none text-lg ml-4;
}
</style>