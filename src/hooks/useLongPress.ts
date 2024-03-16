import { useRef, useState } from 'react';
import { ClickActionType } from '../types';

export default (duration = 500) => {
  const [action, setAction] = useState(0);
  const [userAction, setUserAction] = useState<ClickActionType | undefined>();

  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef<boolean>();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setUserAction(ClickActionType.LONG_PRESS);
      setAction((p) => p + 1);
    }, duration);
  }

  function handleOnClick(e: any) {
    if (isLongPress.current) {
      return;
    }
    setUserAction(ClickActionType.CLICK);
    setAction((p) => p + 1);
  }

  function handleOnMouseDown() {
    startPressTimer();
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    startPressTimer();
  }

  function handleOnTouchEnd() {
    clearTimeout(timerRef.current);
  }

  return {
    action,
    userAction,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
};
