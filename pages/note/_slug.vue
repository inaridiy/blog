<template>
  <main class="container mx-auto px-4 lg:px-8">
    <h1 class="text-6xl items-center justify-between">{{ title }}</h1>
    <p class="publishedAt">{{ date }}</p>
    <div
      class="content w-full prose sm:prose-sm lg:prose-lg max-w-none"
      v-html="$md.render(body)"
    ></div>
  </main>
</template>
<script>
import cheerio from "cheerio";

export default {
  async asyncData({ params, $axios }) {
    const { title, publishedAt, body } = await $axios.$get(
      `${process.env.API_URL}inaridiy/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    const $ = cheerio.load(body);
    const headings = $("h1, h2, h3").toArray();
    const toc = headings.map((data) => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name,
    }));
    console.log(toc);
    return { title, publishedAt, body, toc };
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