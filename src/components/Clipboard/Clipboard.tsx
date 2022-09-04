import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import scssObj from './_Clipboard.scss';

interface Props {
  clipboard?: string[];
  isVisible: boolean;
  hideItself?: boolean;
  copyText: (text: string) => void;
  hideClipboard: () => void;
  clearClipboard: () => void;
}

const ClipboardView = ({
  clipboard,
  hideItself,
  copyText,
  hideClipboard,
  clearClipboard,
}: Props) => {
  const [cleared, setCleared] = useState(false);
  const timeout = useRef<number>();
  const duration = 10000;

  useEffect(() => {
    if (hideItself) {
      clearTimeout(timeout.current);

      timeout.current = window.setTimeout(() => {
        hideClipboard();
      }, duration);
    }
  }, []);

  return (
    <div>
      <div className={`${scssObj.baseClass}__header`}>
        <div className={`${scssObj.baseClass}__title`}>Clipboard</div>
        <Icon
          className={`${scssObj.baseClass}__icon-clear`}
          icon="clear_all"
          onClickHandler={() => {
            clearClipboard();
            setCleared(true);
          }}
        />
        <Icon
          className={`${scssObj.baseClass}__icon-close`}
          icon="close"
          size="small"
          onClickHandler={() => hideClipboard()}
        />
      </div>
      <div className={`${scssObj.baseClass}__main`}>
        {clipboard && !cleared ? (
          <div>
            {clipboard.map((item) => {
              return (
                <div className={`${scssObj.baseClass}__item`}>
                  <div className={`${scssObj.baseClass}__text`}>{item}</div>
                  <Icon
                    className={`${scssObj.baseClass}__icon`}
                    icon="copy"
                    size="small"
                    onClickHandler={() => copyText(item)}
                  />{' '}
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  );
};

const Clipboard = (props: Props) => {
  return (
    <div className={`${scssObj.baseClass}`}>
      {props.isVisible && <ClipboardView {...props} />}
    </div>
  );
};

export default Clipboard;
