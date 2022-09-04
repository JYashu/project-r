import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export default (keys: string[], callback: () => void, shortcutKey: string, node: any = null) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const allKeysPressed = (event: any) => {
    let pressed = false;
    keys.every(key => {
      switch (key) {
        case 'shift':
          pressed = event.shiftKey;
          break;
        case 'ctrl':
          pressed = event.ctrlKey;
          break;
        case 'alt':
          pressed = event.altKey;
          break;
        default:
          break;
      }
      return pressed;
    });
    return pressed;
  };

  // handle what happens on key press
  const handleKeyPress = useCallback(
    event => {
      // check if one of the key is part of the ones we want
      if (allKeysPressed(event) && event.code === `Key${shortcutKey.toUpperCase()}`) {
        callbackRef.current();
      }
    },
    [keys], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    // attach the event listener
    if (targetNode) targetNode.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
};
