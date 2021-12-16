import { AboutContent } from './AboutContent';
import { AboutImage } from '.';

type Props = {};

export const About: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-12 drop-shadow-lg">
      <AboutImage />
      <AboutContent />
    </div>
  );
};
