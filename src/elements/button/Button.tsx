/* eslint-disable react/button-has-type */
import * as React from 'react';
import classnames from 'classnames';

import { Intent, SpinnerType } from '../../types';

import Icon from '../icon';
import LoadingSpinner from '../loadingSpinner';

import scssObj from './_Button.scss';

type ButtonProps = 'children' | 'className' | 'disabled' | 'onClick' | 'onFocus' | 'role';

export interface Props extends Pick<React.ComponentProps<'button'>, ButtonProps> {
  icon?: string;
  iconDescription?: string;
  iconSize?: 'small';
  iconRemoveOutline?: boolean | undefined;
  id?: string;
  intent?: Intent;
  loading?: boolean;
  rightIcon?: boolean;
  size?: 'small' | 'large';
  tabIndex?: number;
  transparent?: boolean;
  type: 'button' | 'submit';
  ignoreChildren?: boolean;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  buttonStyle?: 'game' | 'normal' | 'glossy' | 'abstract' | 'blur' | 'minimal';
  includeFocus?: boolean;
  rounded?: boolean;
  handWriting?: boolean;
  solid?: boolean;
}

const Button = ({
  children,
  className,
  disabled,
  icon,
  iconDescription,
  iconSize,
  iconRemoveOutline,
  id,
  intent,
  loading,
  onClick,
  onFocus,
  rightIcon,
  role,
  size,
  tabIndex,
  transparent,
  type,
  ignoreChildren,
  ariaExpanded,
  ariaLabel,
  buttonStyle,
  includeFocus,
  rounded,
  handWriting,
  solid,
}: Props): React.ReactElement<'button'> => {
  const buttonCls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--empty`]: !React.Children.count(children) || !children || ignoreChildren,
    [`${scssObj.baseClass}--has-icon`]: icon,
    [`${scssObj.baseClass}--intent-${intent}`]: intent,
    [`${scssObj.baseClass}--loading`]: loading,
    [`${scssObj.baseClass}--right-icon`]: rightIcon,
    [`${scssObj.baseClass}--size-${size}`]: size,
    [`${scssObj.baseClass}--transparent`]: !intent && transparent,
    [`${scssObj.baseClass}--solid`]: intent || !transparent || solid,
    [`${scssObj.baseClass}--${buttonStyle}`]: buttonStyle,
    [`${scssObj.baseClass}--include-focus`]: includeFocus,
    [`${scssObj.baseClass}--rounded`]: rounded,
    [`${scssObj.baseClass}--hand-writing`]: handWriting,
  });

  return (
    <button
      className={buttonCls}
      disabled={disabled}
      id={id}
      onClick={onClick}
      onFocus={onFocus}
      role={role}
      tabIndex={tabIndex}
      type={type}
      aria-expanded={ariaExpanded}
    >
      <span className="visually-hidden">{ariaLabel}</span>
      <div className={`${scssObj.baseClass}__content-wrapper`}>
        {icon && (
          <Icon
            icon={icon}
            description={iconDescription}
            size={iconSize}
            removeOutline={iconRemoveOutline}
          />
        )}

        <div className={`${scssObj.baseClass}__children`}>{children}</div>
      </div>

      <div className={`${scssObj.baseClass}__loader-wrapper`}>
        <LoadingSpinner intent={intent} type={SpinnerType.ScaleLoader} size="small" />
      </div>
      {buttonStyle === 'abstract' && (
        <>
          <span className="left" />
          <span className="top" />
          <span className="bottom" />
          <span className="right" />
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  role: 'button',
  transparent: true,
  type: 'button',
};

export default Button;
