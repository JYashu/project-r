import { useEffect } from 'react';

export default (imageURLs: string[]) => {
  useEffect(() => {
    imageURLs.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {};
    });
  }, [imageURLs]);
};
