<template>
  <div
    class="container max-w-screen-sm border m-8 mx-auto rounded-lg text-gray-800 overflow-hidden shadow-lg"
  >
    <h1 class="text-2xl md:text-5xl text-center font-semibold title">
      いなりの開発記録
    </h1>

    <div class="flex mx-auto w-56 font-semibold text-xl items-center">
      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        About
      </NuxtLink>

      <NuxtLink to="/note" class="inline-block mt-0 hover:text-teal-400 mr-4">
        Note
      </NuxtLink>
      <NuxtLink to="/about" class="inline-block mt-0 hover:text-teal-400 mr-4">
        Production
      </NuxtLink>
    </div>

    <p class="title-text text-xl font-semibold text-center m-6">
      常に新しい技術に触れて作りたいものを作りたい。<br />
      そんないなりの日々の開発や作品をまとめたサイトです。
    </p>
  </div>
</template>

<style scoped>
.title {
  background: linear-gradient(70%);
}
</style>


