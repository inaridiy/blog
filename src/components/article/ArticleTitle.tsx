type Props = { titleHtml: string };

export const ArticleTitle: React.FC<Props> = ({ titleHtml }) => {
  return (
    <h1
      className="text-2xl sm:text-4xl font-extrabold text-transparent 
      bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
      dangerouslySetInnerHTML={{ __html: titleHtml }}
    />
  );
};
