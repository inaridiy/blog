import { AboutTitle } from '.';

export const AboutContent: React.FC = ({}) => {
  return (
    <article>
      <AboutTitle />
      <div className="p-2 px-4 dark:text-trueGray-100">
        いなりずしが運営するしがない技術系ブログ
      </div>
    </article>
  );
};
