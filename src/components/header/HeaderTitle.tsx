import Link from 'next/link';

export const HeaderTitle: React.FC = ({}) => {
  return (
    <Link href="/" passHref>
      <a>
        <h1 className="font-bold">
          <span
            className="text-4xl md:text-5xl text-transparent 
      bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500"
          >
            いなり
          </span>
          <span
            className="text-3xl md:text-4xl dark:text-transparent 
      dark:bg-clip-text dark:bg-gradient-to-r from-orange-500 to-blue-500"
          >
            が
          </span>
          <span
            className="text-4xl md:text-5xl text-transparent 
      bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            DIY
          </span>
          <br />
        </h1>
      </a>
    </Link>
  );
};
