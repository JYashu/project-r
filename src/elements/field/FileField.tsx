/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { storeFileData, scrapFileDataById } from '../../redux/fileReader';
import { selectFileDataById } from '../../redux/fileReader/selectors';
import { ModalTypes, openModal } from '../../redux/modal';
import Button from '../button';
import Field from './Field';
import scssObj from './_Field.scss';
import useReselect from '../../hooks/useReselect';
import useLongPress from '../../hooks/useLongPress';
import { ClickActionType, SpinnerType } from '../../types';
import { getFileType } from '../../utils/helpers';
import LoadingSpinner from '../loadingSpinner';
import useGetUniqueId from '../../hooks/useGetUniqueId';
import noop from '../../utils/noop';
import { URL_REGEX } from '../../utils/regex';
import { ELLIPSIS } from '../../utils/consts';
import { FileObj, FileType } from './types';
import { addSnack } from '../../redux/snackbar';

interface Props {
  fieldId?: string;
  minimal?: boolean;
  acceptedTypes?: FileType[];
  className?: string;
  placeHolder?: string;
  errorMessage?: string;
  persistData?: boolean;
  restrictURL?: boolean;
  charLength?: number;
  destroyDataPostLoad?: boolean;
  renderButton?: () => React.ReactNode;
  onFileUpload?: (fileObj: FileObj | undefined) => void;
}

const FileUpload = ({
  fieldId,
  minimal,
  acceptedTypes,
  className,
  placeHolder,
  errorMessage,
  persistData,
  onFileUpload,
  charLength,
  destroyDataPostLoad,
  restrictURL,
  renderButton,
}: Props) => {
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const fileData = useReselect(selectFileDataById, { id });
  const [dragged, setDragged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileObj, setFileObj] = useState<FileObj>();
  const { id: generatedId } = useGetUniqueId();
  const uniqueId = fieldId || generatedId;
  const [fieldValue, setFieldValue] = useState<string>();
  const [url, setURL] = useState<string>();
  const [urlLoaded, setURLLoaded] = useState(false);

  const handleDrag = (event: any) => {
    event.preventDefault();
    setDragged(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setDragged(false);
  };

  /**
   * Scrap the data from redux
   */
  const scrapFileData = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setURL('');
    setFieldValue('');
    if (onFileUpload) onFileUpload(undefined);
    dispatch(scrapFileDataById({ id }));
  };

  // Create id and scrap data after unmount
  useEffect(() => {
    const ID = uniqueId;
    setId(ID);
    return () => {
      if (!persistData) dispatch(scrapFileDataById({ id: ID }));
    };
  }, []);

  // Store file data in redux
  useEffect(() => {
    setIsLoading(false);
    if (!fileObj) return;
    if (
      !(acceptedTypes || ['*']).some((type) => fileObj.type.startsWith(type.replace(/\*/g, '')))
    ) {
      // scrapFileData();
      setError(errorMessage || 'Upload correct file type');
      console.warn(errorMessage || 'Unsupported file type!');
      dispatch(addSnack({ message: errorMessage || 'Unsupported file type!' }));
      return;
    }

    dispatch(storeFileData({ fileData: fileObj, id }));
    if (onFileUpload) onFileUpload(fileObj);
    if (destroyDataPostLoad) scrapFileData();
  }, [fileObj]);

  const handleFileChange = async (e: any) => {
    setError('');
    setIsLoading(true);
    const loadedFile = e.target.files[0] as File;
    if (loadedFile.type === '') {
      const { type, extension } = (await getFileType(loadedFile)) as {
        type: string;
        extension: string;
      };
      setFileObj({
        file: new File([new Blob([loadedFile], { type })], `${loadedFile.name}.${extension}`, {
          type,
        }),
        type,
      });
    } else {
      setFileObj({ file: loadedFile, type: loadedFile.type });
    }
  };

  const handleDrop = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setDragged(false);
    setError('');
    const droppedFile = event.dataTransfer.files[0] as File;
    if (droppedFile.type === '') {
      const { type, extension } = await getFileType(droppedFile);
      setFileObj({
        file: new File([new Blob([droppedFile], { type })], `${droppedFile.name}.${extension}`, {
          type,
        }),
        type,
      });
    } else {
      setFileObj({ file: droppedFile, type: droppedFile.type });
    }
  };

  const previewFileData = useCallback(() => {
    dispatch(
      openModal({
        id: ModalTypes.PreviewModal,
        fileId: id,
        previewType: 'file',
        transparent: true,
      }),
    );
  }, [dispatch, id]);

  const { action, userAction, handlers } = useLongPress();

  useEffect(() => {
    if (userAction === ClickActionType.CLICK) {
      fileInputRef?.current?.click();
    }
    if (userAction === ClickActionType.LONG_PRESS && fileData) {
      previewFileData();
    }
  }, [action]);

  const loadFileFromUrl = async () => {
    if (!url) return;
    let response: Response; // = await fetch(`https://proxy.cors.sh/${url}`);

    try {
      response = await fetch(url);
    } catch (err: any) {
      try {
        response = await fetch(`https://proxy.cors.sh/${url}`);
      } catch (e: any) {
        setError(`Failed to fetch SVG from URL`);
        return;
      }
    }

    const blob = await response.blob();
    const parts = (url || '').split('/');
    const fileName = parts[parts.length - 1];
    const { type } = await getFileType(blob, fileName.split('.')[1]);
    const file = new File([blob], fileName, { type });
    setFileObj({ file, type });
  };

  const handleURLInput = (e: any) => {
    if (fileData) scrapFileData();
    const { value } = e.target as { value: string };
    setFieldValue(value);
    setURL(value);
    setURLLoaded(false);
    if (URL_REGEX.test(value) || !value) {
      setError('');
    } else {
      setError('Enter valid URL');
    }
  };

  return (
    <div
      className={classNames(`${scssObj.baseClass}__file-field`, className)}
      onDrop={handleDrop}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
    >
      {minimal ? (
        <div {...handlers}>
          {renderButton ? (
            renderButton()
          ) : (
            <Button
              className={`${scssObj.baseClass}__upload-button`}
              icon={fileData ? 'description' : 'upload'}
              title={fileData?.file.name || placeHolder || 'Choose File'}
              buttonStyle="default"
              rounded
            />
          )}
        </div>
      ) : (
        <div>
          <Field
            className={`${scssObj.baseClass}__file-input`}
            name="fileUpload"
            hasButton
            renderButton={() => (
              <Button
                className={`${scssObj.baseClass}__upload-button`}
                icon="upload"
                title="Choose File"
                transparent
                loading={isLoading}
                renderLoader={() => <LoadingSpinner type={SpinnerType.ClockLoader} size="large" />}
                onClick={() => fileInputRef?.current?.click()}
              />
            )}
            placeholder={placeHolder || 'No file chosen'}
            icon=""
            title={url || ''}
            iconPosition="LEFT"
            onClick={() => {
              if (restrictURL) fileInputRef?.current?.click();
            }}
            onChange={(e) => {
              if (restrictURL) noop();
              else handleURLInput(e);
            }}
            onBlur={() => {
              if (charLength && url && url.length > charLength) {
                setFieldValue(url.slice(0, charLength) + ELLIPSIS);
              } else setFieldValue(url);
            }}
            onFocus={() => {
              setFieldValue(url);
            }}
            value={fileData?.file.name || fieldValue || ''}
            touched
            errorMessage={error}
          />
          {fileData && (
            <Button
              className={`${scssObj.baseClass}__preview-button`}
              icon="visibility"
              disabled={!fileData}
              title="Preview"
              transparent
              onClick={previewFileData}
            />
          )}
          {url && !error && !urlLoaded && (
            <Button
              className={`${scssObj.baseClass}__load-url-button`}
              icon="rotate_left"
              disabled={!url || Boolean(error) || urlLoaded}
              title="Load URL"
              transparent
              onClick={() => {
                loadFileFromUrl();
                setURLLoaded(true);
              }}
            />
          )}
          {fileData && (
            <Button
              className={`${scssObj.baseClass}__clear-button`}
              icon="close"
              disabled={!fileData}
              title="Clear"
              transparent
              onClick={scrapFileData}
            />
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept={acceptedTypes?.join(', ') || '*'}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
