<template>
  <main class="container mx-auto px-4 lg:px-8 col-span-4">
    <h1 class="text-6xl items-center justify-between">{{ data.title }}</h1>
    <div class="flex">
      <p class="publishedAt">{{ data.date }}</p>
      <div class="items-center justify-between">
        <nuxt-link
          v-for="ele in data.category"
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
      v-html="$md.render(data.body)"
    ></div>
  </main>
</template>
<script>
import cheerio from "cheerio";
export default {
  data() {
    return {
      data: {},
    };
  },
  async created() {
    const query = this.$route.query;
    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }
    const { data } = await $axios.$get(
      `${process.env.API_URL}inaridiy/${query.id}?draftKey=${query.draftKey}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    this.data = data;
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