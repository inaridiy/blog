import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';

type Props = { href: string; text: string };

export const BottomButton: React.FC<Props> = ({ href }) => {
  return (
    <Link href={href}>
      <a className="flex flex-col pt-1 flex-grow justify-center items-center h-full hover:bg-gray-200">
        <AiOutlineHome size="1.75rem" className="text-gray-500" />
        <p className="text-sm">Home</p>
      </a>
    </Link>
  );
};
