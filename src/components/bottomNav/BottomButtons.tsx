import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';

type Props = { href: string; text: string; icon: React.ReactNode };

export const BottomButtons: React.FC = () => {
  return (
    <div className="flex">
      <BottomButton
        href="/"
        text="Home"
        icon={<AiOutlineHome size="1.5rem" />}
      />
      <BottomButton
        href="/"
        text="Blog"
        icon={<AiOutlineHome size="1.5rem" />}
      />
      <BottomButton
        href="/"
        text="Homw"
        icon={<AiOutlineHome size="1.5rem" />}
      />
      <BottomButton
        href="/"
        text="Home"
        icon={<AiOutlineHome size="1.5rem" />}
      />
    </div>
  );
};

export const BottomButton: React.FC<Props> = ({ href, text, icon }) => {
  return (
    <Link href={href}>
      <a className="flex flex-col flex-grow justify-center items-center py-2 h-full hover:text-blue-400">
        {icon}
        <p className="text-sm">{text}</p>
      </a>
    </Link>
  );
};
