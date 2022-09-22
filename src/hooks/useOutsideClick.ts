import React, { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default (callback: () => void, ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
