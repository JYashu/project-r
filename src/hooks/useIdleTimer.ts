import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';

export default (callback: () => void, delay: number) => {
  const [countDownTicker, SetcountDownTicker] = useState(
    new Date().getTime() + delay
  );

  const [count, SetCount] = useState(delay);

  const onActive = () => {
    SetcountDownTicker(new Date().getTime() + delay);
  };

  useIdleTimer({
    timeout: 0,
    throttle: 1000,
    onActive,
    crossTab: true,
  });

  useEffect(() => {
    const tickingDown = setInterval(() => {
      SetCount(countDownTicker - new Date().getTime());
    }, 1000);
    return () => clearInterval(tickingDown);
  }, [count, countDownTicker]);

  if (count <= 0) {
    callback();
  }
  return null;
};
