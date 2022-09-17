import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';
import scssObj from './_Resizable.scss';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: any;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  let props: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    props = {
      className: `${scssObj.baseClass}__resize-horizontal`,
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event: any, data: any) => {
        setWidth(data.size.width);
      },
    };
  } else {
    props = {
      height: 200,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.99],
      minConstraints: [Infinity, innerHeight * 0.08],
    };
  }
  return <ResizableBox {...props}>{children}</ResizableBox>;
};

export default Resizable;
