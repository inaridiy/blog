import { usePos } from '../../hooks/usePos';

type Props = {};

export const Progress: React.FC<Props> = ({}) => {
  const progress = usePos();
  return (
    <div className="fixed top-0 right-0 z-10 w-full h-1.5 bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-500">
      <div
        className="w-full h-full bg-gray-200"
        style={{
          transform: `translateX(${progress * 100}%)`,
        }}
      ></div>
    </div>
  );
};
