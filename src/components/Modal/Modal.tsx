import classnames from 'classnames';
import React from 'react';
import ReactModal from 'react-modal';

import Button from '../Button';

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
}

const Modal = ({ cancellable, children, handleClose, className, isOpen, size, dark }: Props) => {
  const cls = dark ? scssObj.baseClassDark : scssObj.baseClass;
  return (
    <ReactModal
      className={classnames(`${cls}__dialog`, className, {
        [`${cls}__dialog--size-${size}`]: size,
      })}
      isOpen={isOpen}
      overlayClassName={cls}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      {cancellable && handleClose && (
        <Button icon="close" className={`${cls}__close`} onClick={handleClose} />
      )}
      <div className={`${cls}__content`}>{children}</div>
    </ReactModal>
  );
};

Modal.defaultProps = {
  size: 'medium',
};

export default Modal;
