import { NormalLayout } from '../components/layouts/normal';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import Image from 'next/image';
import { Spacer } from '../components/ui';

export default function Home() {
  return (
    <article className="container flex justify-center items-center px-2 mx-auto max-w-lg">
      <div
        style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
        className="p-2 w-full bg-gray-100 rounded-lg drop-shadow-lg flex flex-col sm:flex-row-reverse"
      >
        <div className="drop-shadow w-32 shrink-0">
          <Image
            src="/profImage.jpg"
            alt="profile"
            className="rounded-full"
            width={200}
            height={200}
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-600 drop-shadow">
            どうも<span className="text-4xl text-gray-900">いなりずし</span>です
            <span className="text-cyan-500">。</span>
          </h1>
          <div className="flex gap-2 mb-6">
            <a
              className="text-sky-500"
              href="https://twitter.com/unknown_gakusei"
            >
              <BsTwitter size="1.5rem" />
            </a>
            <a href="https://github.com/inaridiy">
              <BsGithub size="1.5rem" />
            </a>
          </div>
          <h2 className="text-xl font-bold text-gray-800">自己紹介</h2>
          <p className="mb-2">
            中三の頃に
            <wbr />
            Web系の技術にはまり、
            <wbr />
            サーバーサイドフロントエンドとかを
            <wbr />
            勉強してます。
            <br />
            趣味で
            <wbr />
            マイクラのサーバーを
            <wbr />
            運営していたりもします。
            <br />
            KaiYコミュニティ所属
          </p>
          <h2 className="text-xl font-bold text-gray-800">使える技術一覧</h2>
          <p className="mb-2">
            Vue,Nuxt,Next,React,TypeScript,Firebase,CSS,SCSS,HTMLなど
          </p>
          <h2 className="text-xl font-bold text-gray-800">
            このサイトについて
          </h2>
          <p>
            僕が運営しているブログです。
            <br />
            フロントエンドはNext.jsで
            <wbr />
            バックエンドはMicroCMSを使っています。
          </p>
        </div>
      </div>
    </article>
  );
}

Home.getLayout = (page: React.ReactElement) => (
  <NormalLayout alwaysShowBottomNav>{page}</NormalLayout>
);
