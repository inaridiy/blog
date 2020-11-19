<template>
  <header>
    <nav class="fixed top-0 z-40 w-full border-b bg-gray-800">
      <div class="container mx-auto flex-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center pr-4">
            <NuxtLink to="/" class="flex-shrink-0 font-bold text-xl">
              <span
                class="font-semibold text-xl sm:text-2xl tracking-tight text-white mr-6"
                >いなりの開発記録</span
              >
            </NuxtLink>
            <div class="flex font-normal sm:text-xl items-center">
              <NuxtLink
                to="/about"
                class="inline-block mt-0 text-teal-200 hover:text-white mr-4"
              >
                about
              </NuxtLink>

              <NuxtLink
                to="/about"
                class="inline-block mt-0 text-teal-200 hover:text-white"
              >
                note
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="inline-block mt-0 text-teal-200 hover:text-white mr-4"
              >
                　project
              </NuxtLink>
            </div>
          </div>
          <div class="w-1/5 hidden sm:flex items-center pl-8">
            <div class="flex items-center">
              <a
                :href="`https://twitter.com/inarizushi19`"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                name="Twitter"
                class="text-gray-200 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 ml-4"
              >
                <IconTwitter class="w-5 h-5" />
              </a>
              <a
                :href="`https://github.com/inaridiy`"
                target="_blank"
                rel="noopener noreferrer"
                title="Github"
                name="Github"
                class="text-gray-200 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 ml-4"
              >
                <IconGithub class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
</script>