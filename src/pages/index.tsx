import { NormalLayout } from '../components/layouts/normal';
import { About } from '../components/about';
import { BlogCard } from '../components/home/cards/BlogCard';

export default function Home(): React.ReactElement {
  return (
    <div className="container px-2 md:px-4 mx-auto">
      <div
        className="h-96 flex items-center text-center justify-center px-8 flex-col gap-2"
        style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
      >
        <h2 className="text-3xl font-bold">
          泥臭い<span className="text-blue-500">努力</span>が
          <wbr />
          実を結ぶと信じて
        </h2>
        <p className="text-lg text-gray-500">無名な学生のしがないブログ</p>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
