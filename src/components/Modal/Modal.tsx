import classnames from 'classnames';
import React from 'react';
import ReactModal from 'react-modal';

import Button from '../../elements/button';

import scssObj from './_Modal.scss';
import { ModalSize } from './types';

interface Props {
  children: React.ReactNode;
  className?: string;
  handleClose?: () => void;
  isOpen: boolean;
  size: ModalSize;
  cancellable?: boolean;
  dark?: boolean;
  transparent?: boolean;
}

const Modal = ({
  cancellable,
  children,
  handleClose,
  className,
  isOpen,
  size,
  dark,
  transparent,
}: Props) => {
  const cls = dark ? scssObj.baseClassDark : scssObj.baseClass;
  return (
    <ReactModal
      closeTimeoutMS={1000}
      className={classnames(
        `${cls}__dialog`,
        className,
        `${cls}__dialog--background-${transparent ? 'transparent' : 'solid'}`,
        {
          [`${cls}__dialog--size-${size}`]: size,
        },
      )}
      ariaHideApp={false}
      isOpen={isOpen}
      overlayClassName={cls}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      {cancellable && handleClose && (
        <Button icon="close" transparent className={`${cls}__close`} onClick={handleClose} />
      )}
      <div className={`${cls}__content`}>{children}</div>
    </ReactModal>
  );
};

Modal.defaultProps = {
  size: 'medium',
};

export default Modal;
