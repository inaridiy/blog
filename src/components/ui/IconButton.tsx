import React from 'react';

type Props = { children: React.ReactNode };

export const IconButton: React.FC<Props> = ({ children }) => {
  return <button className="dark:text-trueGray-100">{children}</button>;
};
