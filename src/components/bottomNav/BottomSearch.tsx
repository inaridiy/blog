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
    onSwiped: ({ event }) => event.stopPropagation(),
    onSwiping: ({ event }) => event.stopPropagation(),
    trackMouse: true,
  });
  useEffect(() => {
    fetch('/api/search?query=')
      .then((res) => res.json())
      .then((res) => {
        setArticles(res.contents);
      });
  }, []);
  return (
    <div className="overflow-y-scroll p-2 w-full h-full" {...handlers}>
      <div className="flex flex-col gap-2">
        <input
          className="p-1 w-full h-12 rounded-lg drop-shadow"
          placeholder=" 検索ワードを入力"
          onChange={onChange}
        />
        {articles.slice(1).map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};
