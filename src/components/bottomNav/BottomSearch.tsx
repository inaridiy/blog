import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ArticleCard } from '../article/ArticleCard';
import { Article, ArticleList } from '../../types/article';

export const BottomSearch: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const articleList = (await (
      await fetch('/api/search?query=' + e.target.value)
    ).json()) as ArticleList;
    setArticles(articleList.contents);
  };
  const handlers = useSwipeable({
    onSwiping: ({ event }) => {
      event.stopPropagation();
    },
    onTap: ({ event }) => {
      event.stopPropagation();
    },
    trackMouse: true,
  });

  return (
    <div
      style={{ overscrollBehaviorY: 'none' }}
      className="overflow-y-scroll p-2 w-full h-full"
      {...handlers}
    >
      <input
        className="p-1 mb-4 w-full h-12 rounded-lg drop-shadow"
        placeholder=" 検索ワードを入力"
        onChange={onChange}
      />
      <div className="flex flex-col gap-2">
        {articles.slice(1).map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};
