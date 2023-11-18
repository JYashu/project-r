import React from 'react';

type AnyRefObject = React.MutableRefObject<null> | React.RefObject<any>;

const getElementPositionFromRef = (ref: AnyRefObject) => {
  const element = ref.current;
  return element === null
    ? { height: 0, width: 0, bottom: 0, top: 0, left: 0, right: 0 }
    : (element as HTMLElement).getBoundingClientRect();
};

export const getPopOutPosition = (
  triggerRef: AnyRefObject,
  contentRef: AnyRefObject,
  defaultPosition: 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'TOP_LEFT' | 'BOTTOM_LEFT',
  fixed?: boolean, // fixed to the window to get content out of scrollable containers
): React.CSSProperties => {
  const triggerRect = getElementPositionFromRef(triggerRef);

  if (fixed) {
    const contentRect = contentRef.current?.children?.[0]
      ? contentRef.current.children[0].getBoundingClientRect()
      : getElementPositionFromRef(contentRef);
    const styles: React.CSSProperties = {
      position: 'fixed' as const,
      zIndex: 9999,
    };

    // window dimensions to determine if position needs to be flipped due to out of bounds
    const bodyHeight = window.document.body.clientHeight;
    const bodyWidth = window.document.body.clientWidth;
    const topStyles = triggerRect.top - contentRect.height;
    const rightStyles = triggerRect.left;
    const bottomStyles = triggerRect.top + triggerRect.height;
    const leftStyles = triggerRect.left + triggerRect.width - contentRect.width;

    switch (defaultPosition) {
      case 'BOTTOM_RIGHT': {
        styles.top = bottomStyles + contentRect.height > bodyHeight ? topStyles : bottomStyles;
        styles.left = rightStyles + contentRect.width > bodyWidth ? leftStyles : rightStyles;
        break;
      }
      case 'BOTTOM_LEFT': {
        styles.top = bottomStyles + contentRect.height > bodyHeight ? topStyles : bottomStyles;
        styles.left = leftStyles < 0 ? rightStyles : leftStyles;
        break;
      }
      case 'TOP_RIGHT': {
        styles.top = topStyles < 0 ? bottomStyles : topStyles;
        styles.left = rightStyles + contentRect.width > bodyWidth ? leftStyles : rightStyles;
        break;
      }
      case 'TOP_LEFT': {
        styles.top = topStyles < 0 ? bottomStyles : topStyles;
        styles.left = leftStyles < 0 ? rightStyles : leftStyles;
        break;
      }
      default:
        break;
    }

    return styles;
  }

  switch (defaultPosition) {
    case 'BOTTOM_RIGHT':
      return {
        top: triggerRect.height,
        left: 0,
      };
    case 'BOTTOM_LEFT':
      return {
        top: triggerRect.height,
        right: 0,
      };
    case 'TOP_RIGHT':
      return {
        bottom: triggerRect.height,
        left: 0,
      };
    case 'TOP_LEFT':
      return {
        bottom: triggerRect.height,
        right: 0,
      };
    default:
      return {};
  }
};
