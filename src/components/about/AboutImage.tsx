import Image from 'next/image';

export const AboutImage: React.FC = ({}) => {
  return (
    <div className="overflow-hidden p-5 w-1/2 sm:w-1/2">
      <Image
        src="/profImage.jpg"
        className="rounded-lg"
        alt="プロフィール画像"
        width={400}
        height={400}
      />
    </div>
  );
};
