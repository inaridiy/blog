import { AboutContent } from './AboutContent';
import { AboutImage } from './AboutImage';

type Props = {};

export const About: React.FC<Props> = ({}) => {
  return (
    <div
      className={`max-w-screen-md flex flex-col sm:flex-row gap-3 sm:items-center mt-8 
      bg-gradient-to-bl from-cyan-300 to-pink-500 rounded-lg 
      border-2 dark:border-gray-700  drop-shadow-lg`}
    >
      <AboutImage />
      <AboutContent />
    </div>
  );
};
