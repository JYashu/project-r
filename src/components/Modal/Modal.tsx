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
}

const Modal = ({ cancellable, children, handleClose, className, isOpen, size }: Props) => (
  <ReactModal
    className={classnames(`${scssObj.baseClass}__dialog`, className, {
      [`${scssObj.baseClass}__dialog--size-${size}`]: size,
    })}
    isOpen={isOpen}
    overlayClassName={scssObj.baseClass}
    onRequestClose={handleClose}
    shouldCloseOnOverlayClick={false}
    shouldCloseOnEsc={false}
  >
    {cancellable && handleClose && (
      <Button icon="close" className={`${scssObj.baseClass}__close`} onClick={handleClose} />
    )}
    <div className={`${scssObj.baseClass}__content`}>{children}</div>
  </ReactModal>
);

Modal.defaultProps = {
  size: 'medium',
};

export default Modal;
