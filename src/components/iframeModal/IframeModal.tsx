import useWindowDimensions from '../../hooks/useWindowDimensions';
import scssObj from './_IframeModal.scss';

const IframeModal = ({
  url,
  iframeRef,
  handleClose,
}: {
  url: string;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
  handleClose?: () => void;
}) => {
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
      <div
        className={`${scssObj.baseClass}__iframe`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <iframe
          title="display"
          ref={iframeRef}
          src={url}
          width={`${width}px`}
          height={`${height}px`}
        />
      </div>
    </div>
  );
};

export default IframeModal;
