type Props = { titleHtml: string };

export const ArticleTitle: React.FC<Props> = ({ titleHtml }) => {
  return (
    <h1
      className=" text-4xl font-bold"
      dangerouslySetInnerHTML={{ __html: titleHtml }}
    />
  );
};
