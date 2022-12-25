import useWindowDimensions from '../../hooks/useWindowDimensions';
import scssObj from './_ImageModal.scss';

const ImageModal = ({ url, handleClose }: { url: string; handleClose?: () => void }) => {
  let width = 600;
  let height = 600;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  if (width > 0.8 * windowWidth) {
    width = windowWidth * 0.8;
  }

  if (height > 0.8 * windowHeight) {
    height = windowHeight * 0.8;
  }

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__image`}>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background: `url(${url})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
