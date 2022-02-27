import { useEffect, useState } from "react";

export const useStorageState = <T>(
  key: string,
  initialValue: T
): [T, (v: T) => void] => {
  const [item, _setItem] = useState<T>(initialValue);

  const setItem = (value: T) => {
    localStorage.setItem(`storageItem/${key}`, JSON.stringify(value));
    _setItem(value);
  };

  useEffect(() => {
    if (localStorage) {
      const cache = localStorage.getItem(`storageItem/${key}`);
      cache && _setItem(JSON.parse(cache) as T);
    }
  }, []);

  return [item, setItem];
};
