import { useRef, useState } from 'react';
import { SwipeActionType } from '../types';

export default (duration = 500) => {
  const [action, setAction] = useState(0);
  const [userAction, setUserAction] = useState<SwipeActionType | undefined>();
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

  const minSwipeDistance = 50;

  const handleOnTouchStart = (e: any) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleOnTouchMove = (e: any) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleOnTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;
    const horDistance = touchStartX - touchEndX;
    const verDistance = touchStartY - touchEndY;
    const isLeftSwipe = horDistance > minSwipeDistance;
    const isUpSwipe = verDistance > minSwipeDistance;

    if (Math.abs(horDistance) > Math.abs(verDistance)) {
      if (isLeftSwipe) setUserAction(SwipeActionType.LEFT);
      else setUserAction(SwipeActionType.RIGHT);
    } else if (isUpSwipe) {
      setUserAction(SwipeActionType.UP);
    } else {
      setUserAction(SwipeActionType.DOWN);
    }
    setAction((val) => val + 1);
  };

  return {
    action,
    userAction,
    handlers: {
      onTouchStart: handleOnTouchStart,
      onTouchMove: handleOnTouchMove,
      onTouchEnd: handleOnTouchEnd,
    },
  };
};
