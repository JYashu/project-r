import classnames from 'classnames';
import React from 'react';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

import { Intent } from '../../types';
import { ASSETS_BASE_URL } from '../../utils/assets';

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
  isExternal?: boolean;
  linkStyle?: 'button' | 'container';
  target?: string;
  rel?: string;
  dataTestId?: string;
  externalLinkIcon?: boolean;
}

const Link = ({
  buttonProps,
  children,
  className,
  isExternal,
  linkStyle,
  onClick,
  rel,
  target,
  to,
  dataTestId,
  externalLinkIcon,
}: Props) => {
  const cls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--button`]: linkStyle === 'button' || buttonProps,
    [`${scssObj.baseClass}--button-intent-${buttonProps?.intent}`]: buttonProps?.intent,
    [`${scssObj.baseClass}--button-transparent`]: buttonProps?.transparent,
    [`${scssObj.baseClass}--container`]: linkStyle === 'container',
    [`${scssObj.baseClass}--icon`]: buttonProps?.icon,
    [`${scssObj.baseClass}--icon-only`]: buttonProps?.icon && !children,
    [`${scssObj.baseClass}--is-external`]: isExternal,
  });

  if (isExternal && typeof to === 'string') {
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
        {externalLinkIcon && (
          <svg
            className={`${scssObj.baseClass}--link-external`}
            viewBox="0 0 12 12"
            height="12"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>external link</title>
            <path d="M6 1h5v5L8.86 3.85 4.7 8 4 7.3l4.15-4.16L6 1ZM2 3h2v1H2v6h6V8h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          </svg>
        )}
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
