import { useEffect, useState } from 'react';
import scssObj from './_Cursor.scss';

const Cursor = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const animateCursor = (e: any) => {
    setX(`${e.clientX}px`);
    setY(`${e.clientY}px`);
  };

  useEffect(() => {
    window.addEventListener('mousemove', animateCursor);
    return () => window.removeEventListener('mousemove', animateCursor);
  });

  return <div className={`${scssObj.baseClass}`} style={{ left: x, top: y }} />;
};

export default Cursor;
