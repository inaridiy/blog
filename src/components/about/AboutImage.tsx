import Image from 'next/image';

export const AboutImage: React.FC = ({}) => {
  return (
    <div className="overflow-hidden w-32 sm:w-48">
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
