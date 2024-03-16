import { useEffect } from 'react';

export default (history: any, path: string) => {
  let handler: any;

  const refresh = () => {
    history.replace(path);

    handler = setTimeout(() => history.push(path), 10);
  };

  useEffect(() => {
    return () => handler && clearTimeout(handler);
  }, [handler]);

  return refresh;
};
