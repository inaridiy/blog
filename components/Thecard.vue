<template>
  <nuxt-link
    :to="`/note/${content.id}`"
    class="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto transform hover:scale-95 transition duration-300"
  >
    <img
      :src="content.image ? content.image.url : `/ogp/${content.id}.png`"
      alt=""
      loading="lazy"
      class="bg-gray-300 h-56 w-full border-2 border-gray-400 rounded-lg shadow-md bg-cover bg-center"
    />

    <div class="w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
      <div class="title-post text-xl font-medium">{{ content.title }}</div>
      <div class="summary-post text-base text-justify">
        {{ content.body }}
      </div>
      <div class="flex">
        <p class="text-lg">{{ date }}</p>
        <div class="items-center justify-between">
          <div
            v-for="ele in content.category"
            :key="ele.id"
            class="mx-2 rounded-lg px-1 bg-gray-800 text-gray-100"
          >
            {{ ele.name }}
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<style scoped>
.summary-post {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
<script>
export default {
  props: ["content"],
  computed: {
    date: function () {
      const date = new Date(this.content.publishedAt).toLocaleDateString(
        "ja-jp"
      );
      return date;
    },
  },
};
</script>