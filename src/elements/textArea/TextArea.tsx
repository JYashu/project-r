import * as React from 'react';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import scssObj from './_TextArea.scss';
import Icon from '../icon';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  taWidth?: number;
  taHeight?: number;
  hasError?: boolean;
  hasLabel?: boolean;
}

const TextArea: React.SFC<Props> = ({
  className,
  hasError,
  hasLabel,
  taWidth,
  taHeight,
  ...rest
}: Props) => {
  const cls = classnames(scssObj.baseClass, {
    [`${scssObj.baseClass}--error`]: hasError,
    [`${scssObj.baseClass}--labelled`]: hasLabel,
  });

  const [componentWidth, setComponentWidth] = useState(taWidth || 500);
  const [componentHeight, setComponentHeight] = useState(taHeight || 150);
  const [startX, setStartX] = useState<number>();
  const [startY, setStartY] = useState<number>();
  const [startWidth, setStartWidth] = useState<number>();
  const [startHeight, setStartHeight] = useState<number>();

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (!!startX && !!startY && !!startWidth && !!startHeight) {
        const newWidth = startWidth + (e.pageX - startX);
        const newHeight = startHeight + (e.pageY - startY);
        setComponentWidth(newWidth);
        setComponentHeight(newHeight);
      }
    };

    const handleTouchMove = (e: any) => {
      if (
        e.target.classList.contains('material-icons') &&
        e.target.textContent.includes('horizontal_rule')
      ) {
        if (!!startX && !!startY && !!startWidth && !!startHeight) {
          const newWidth = startWidth + (e.touches[0].pageX - startX);
          const newHeight = startHeight + (e.touches[0].pageY - startY);
          setComponentWidth(newWidth);
          setComponentHeight(newHeight);
        }
      }
    };

    function handleMouseUp() {
      setStartX(undefined);
      setStartY(undefined);
      setStartWidth(undefined);
      setStartHeight(undefined);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [startX, startY, startWidth, startHeight]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setStartX(e.pageX);
    setStartY(e.pageY);
    setStartWidth(componentWidth);
    setStartHeight(componentHeight);
  };

  const handleTouchStart = (e: any) => {
    e.preventDefault();
    setStartX(e.touches[0].pageX);
    setStartY(e.touches[0].pageY);
    setStartWidth(componentWidth);
    setStartHeight(componentHeight);
  };

  return (
    <div className={classnames(className, `${scssObj.baseClass}__wrapper`)}>
      <textarea
        className={cls}
        {...rest}
        style={{ width: componentWidth, height: componentHeight }}
      />
      <div
        style={{ width: 'fit-content', height: 'fit-content' }}
        role="none"
        className={`${scssObj.baseClass}__handle`}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      >
        <Icon icon="horizontal_rule" size="small" />
      </div>
    </div>
  );
};

export default TextArea;
