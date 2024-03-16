import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useReselect from '../../hooks/useReselect';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { selectFileDataById, selectFilesById } from '../../redux/fileReader';
import scssObj from './_PreviewModal.scss';

const PreviewModal = ({
  url,
  fileId,
  previewType,
  iframeRef,
  handleClose,
}: {
  url?: string;
  fileId?: string;
  previewType: 'img' | 'file';
  iframeRef?: React.RefObject<HTMLIFrameElement>;
  handleClose?: () => void;
}) => {
  const [blobURL, setBlobURL] = useState('');
  const [displayType, setDisplayType] = useState('iframe');
  let width = 600;
  let height = 600;

  const file = useReselect(selectFileDataById, { id: fileId || '' });

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    if (previewType === 'file' && file && fileId) {
      setBlobURL(URL.createObjectURL(file.file));

      if (file.type.startsWith('image/')) {
        setDisplayType('image');
      } else if (file.type.startsWith('video/')) {
        setDisplayType('video');
      } else {
        setDisplayType('iframe');
      }
    } else if (previewType === 'file' && url) {
      setBlobURL(url);
    }
  }, [file, previewType, url, fileId]);

  if (width > 0.8 * windowWidth) {
    width = windowWidth * 0.8;
  }

  if (height > 0.8 * windowHeight) {
    height = windowHeight * 0.8;
  }

  return (
    <div className={`${scssObj.baseClass}`}>
      {previewType === 'img' ||
        (displayType === 'image' && (
          <div className={`${scssObj.baseClass}__image`}>
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                background: `url(${blobURL})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}
            />
          </div>
        ))}
      {previewType === 'file' && displayType === 'video' && (
        <div
          className={`${scssObj.baseClass}__video`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <video controls src={blobURL} width={width - 10}>
            <track kind="captions" label="English" />
          </video>
        </div>
      )}
      {previewType === 'file' && displayType === 'iframe' && (
        <div
          className={`${scssObj.baseClass}__iframe`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <iframe title="display" src={blobURL} width={`${width}px`} height={`${height}px`} />
        </div>
      )}
    </div>
  );
};

export default PreviewModal;
