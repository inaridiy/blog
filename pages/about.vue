<template>
  <div
    class="container max-w-screen-lg border m-8 p-8 mx-auto rounded-lg text-gray-800 overflow-hidden shadow-lg"
  >
    <h1 class="font-bold text-xl">
      Hi, I'm <span class="text-4xl font-semibold">Inarizushi</span>
    </h1>

    <div class="flex items-center my-2">
      <a
        :href="`https://twitter.com/inarizushi19`"
        target="_blank"
        rel="noopener noreferrer"
        title="Twitter"
        name="Twitter"
        class="fill-current text-gray-800"
      >
        <IconTwitter class="w-6 h-6" />
      </a>
      <a
        :href="`https://github.com/inaridiy`"
        target="_blank"
        rel="noopener noreferrer"
        title="Github"
        name="Github"
        class="text-gray-800 hover:text-primary-500 dark-hover:text-primary-500 ml-4"
      >
        <IconGithub class="w-6 h-6" />
      </a>
    </div>
    <article class="content my-4">
      <h2 class="text-2xl font-bold my-4">Who am I</h2>
      <div class="text-lg font-medium">
        大阪在住の中学3年生なプログラマーです。<br />
        基本一人で全部作ってるのでフロント、バックエンド両方やってます。<br />
        実務で働いているプログラマーが書くようなコードを書けるように日々精進しています。<br />
        <span class="text-gray-500"
          >(とか言っときながらテストもろくにせず、ちょっとおかしいデザインになったりしてます...)</span
        >
      </div>
      <h2 class="text-2xl font-bold my-4">This WebSite</h2>
      <div class="text-lg font-medium">
        ぼく個人の日々のメモや日記、作品などをまとめるために作ってます。<br />
        あと、このサイトはある方のサイトのデザインを参考にNuxt,TailwindCSS,microCMSで作成し、Netlifyでホストしています。<br />
        <span class="text-gray-500"
          >ホントはバックエンドも自作したかったけど時間がなかった...</span
        >
      </div>
      <h2 class="text-2xl font-bold my-4">Skills</h2>
      <div class="text-lg font-medium">
        2020年11月の時点で、大体以下のスキルがあったり、興味があったりします。<br />
        <br />
        スキル・・・HTML/CSS/Javascript/Vue/Nuxt/wordpress/Express/socket.io/<br />
        興味があるだけ・・・Svelte/React/React native/Unity/C#/Sapper
      </div>
    </article>
  </div>
</template>