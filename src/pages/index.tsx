import { NormalLayout } from '../components/layouts/normal';
import { About } from '../components/about';
import { BlogCard } from '../components/home/cards/BlogCard';

export default function Home(): React.ReactElement {
  return (
    <div className="container px-2 md:px-4 mx-auto">
      <div
        className="flex flex-col gap-2 justify-center items-center px-8 h-96 text-center"
        style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
      >
        <h2 className="text-3xl font-bold">
          毎日が
          <span
            className="text-4xl text-transparent bg-clip-text 
          bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            EveryDay
          </span>
          ,
          <wbr />
          あしたも
          <span
            className="text-4xl text-transparent bg-clip-text 
          bg-gradient-to-r from-orange-500 to-pink-500"
          >
            Tomorrow
          </span>
        </h2>
        <p className="text-lg text-gray-500">無名な学生のしがないブログ</p>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <NormalLayout alwaysShowBottomNav>{page}</NormalLayout>;
};
