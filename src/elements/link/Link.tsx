import classnames from 'classnames';
import React from 'react';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

import { Intent } from '../../types';

import Icon from '../icon';

import scssObj from './_Link.scss';

interface Props extends LinkProps {
  buttonProps?: {
    icon?: string;
    iconDescription?: string;
    intent?: Intent;
    transparent?: boolean;
    colors?: boolean;
  };
  children?: React.ReactNode;
  className?: string;
  isNative?: boolean;
  linkStyle?: 'button' | 'container';
  target?: string;
  rel?: string;
  dataTestId?: string;
}

const Link = ({
  buttonProps,
  children,
  className,
  isNative,
  linkStyle,
  onClick,
  rel,
  target,
  to,
  dataTestId,
}: Props) => {
  const cls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--button`]: linkStyle === 'button' || buttonProps,
    [`${scssObj.baseClass}--button-intent-${buttonProps?.intent}`]: buttonProps?.intent,
    [`${scssObj.baseClass}--button-transparent`]: buttonProps?.transparent,
    [`${scssObj.baseClass}--button-colors`]: buttonProps?.colors,
    [`${scssObj.baseClass}--container`]: linkStyle === 'container',
    [`${scssObj.baseClass}--icon`]: buttonProps?.icon,
    [`${scssObj.baseClass}--icon-only`]: buttonProps?.icon && !children,
  });

  if (isNative && typeof to === 'string') {
    return (
      <a
        className={cls}
        href={to}
        onClick={onClick}
        rel={rel}
        target={target}
        data-test-id={dataTestId}
      >
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink className={cls} onClick={onClick} to={to} rel={rel} target={target}>
      {buttonProps?.icon && (
        <Icon icon={buttonProps.icon} description={buttonProps?.iconDescription} />
      )}

      {children}
    </ReactRouterLink>
  );
};

export default Link;
