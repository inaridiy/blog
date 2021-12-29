import { useState, useEffect, useRef } from 'react';

export const usePos = () => {
  const [progress, setProgress] = useState(0);

  const onScroll = (): void => {
    const windowYPos = window.pageYOffset;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = windowYPos / height;

    setProgress(scrolled);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return (): void => document.removeEventListener('scroll', onScroll);
  });
  return progress;
};
