import { AboutTitle } from '.';

export const AboutContent: React.FC = ({}) => {
  return (
    <article className="flex-grow m-2 -mt-10 sm:mt-0 sm:-ml-10">
      <AboutTitle />
      <div className="p-2 px-4 dark:text-trueGray-100">
        いなりずしが運営するしがない技術系サイト
        <br />
        Next.js + TypeScript + TailwindCSS + MicroCMS + Vercelで出来てます
      </div>
    </article>
  );
};
