import { useEffect, useCallback, useRef } from 'react';
import classnames from 'classnames';
import scssObj from './_Snackbars.scss';
import Button from '../../elements/button';
import { Snack, SnackType } from '../../types';
import images from '../../utils/images';

const { SUCCESS, FAILURE, DEFAULT } = SnackType;

type RemoveSnack = (payload: { id: string }) => void;

interface SnackbarProps extends Snack {
  removeSnack: RemoveSnack;
}

interface Props {
  snacks: Snack[];
  removeSnack: RemoveSnack;
}

const defaultProps = {
  snackType: DEFAULT,
};

const Snackbar = ({ id, duration, message, img, removeSnack, snackType }: SnackbarProps) => {
  const timeout = useRef<number>();
  const handleClick = useCallback(() => {
    removeSnack({ id });
  }, [id, removeSnack]);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = window.setTimeout(() => {
      removeSnack({ id });
    }, duration);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [duration, id, removeSnack]);

  const cls = classnames(`${scssObj.baseClass}__snack`, {
    [`${scssObj.baseClass}__snack--success`]: snackType === SUCCESS,
    [`${scssObj.baseClass}__snack--failure`]: snackType === FAILURE,
    [`${scssObj.baseClass}__snack--custom`]: duration !== 3500,
  });

  const pcls = classnames(`${scssObj.baseClass}__progress`, {
    [`${scssObj.baseClass}__progress--custom`]: duration !== 3500,
  });

  return (
    <div className={cls}>
      <div className={`${scssObj.baseClass}__content`}>
        <div
          aria-live="polite"
          className={classnames(`${scssObj.baseClass}__message`)}
          role="status"
          aria-label="snackbar-status"
        >
          <div className={`${scssObj.baseClass}__text`}>{message}</div>
          <div className={`${scssObj.baseClass}__img`}>{img && images.get(img)}</div>
        </div>

        <Button
          className={`${scssObj.baseClass}__dismiss`}
          icon="close"
          transparent
          iconDescription={`Dismiss snack message. ${message}`}
          onClick={handleClick}
        />
      </div>
      <span className={pcls} />{' '}
    </div>
  );
};

const Snackbars = ({ snacks, removeSnack }: Props) => {
  return (
    <div className={scssObj.baseClass} role="alert" aria-label="snackbar-alert">
      {snacks.map((snack) => (
        <Snackbar {...snack} removeSnack={removeSnack} key={snack.id} />
      ))}
    </div>
  );
};

Snackbar.defaultProps = defaultProps;

export default Snackbars;
