import React from 'react';
import classnames from 'classnames';

import scssObj from './_Input.scss';
import Icon from '../icon';
import Button from '../button';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  hasLabel?: boolean;
  icon?: string;
  iconPosition?: 'LEFT' | 'RIGHT';
  onIconClick?: () => void;
  ref?: any;
  rounded?: boolean;
  isTransparent?: boolean;
  canSubmit?: boolean;
  fieldSize?: 'small';
  submitButton?: () => React.ReactNode;
}

const renderBackgroundIcon = (
  icon: string,
  iconPosition: 'LEFT' | 'RIGHT',
  onIconClick?: () => void,
  size?: 'small' | 'medium',
) => (
  <div className={`${scssObj.baseClass}__icon-container`}>
    <Icon
      icon={icon}
      className={classnames(
        `${scssObj.baseClass}--${size || 'default'}`,
        `${scssObj.baseClass}--${onIconClick ? 'pointer' : 'default'}`,

        iconPosition === 'LEFT'
          ? `${scssObj.baseClass}__left-background-icon`
          : `${scssObj.baseClass}__right-background-icon`,
      )}
      size={size}
      onClickHandler={onIconClick}
    />
  </div>
);

const Input: React.SFC<Props> = React.forwardRef((props: Props, ref: any) => {
  const {
    className,
    hasError,
    hasLabel,
    icon,
    iconPosition,
    onIconClick,
    rounded,
    isTransparent,
    canSubmit,
    submitButton,
    fieldSize,
    ...rest
  } = props;

  const cls = classnames(
    scssObj.baseClass,
    className,
    {
      [`${scssObj.baseClass}--error`]: hasError,
      [`${scssObj.baseClass}--labelled`]: hasLabel,
      [`${scssObj.baseClass}--with-left-icon`]: icon && iconPosition === 'LEFT',
      [`${scssObj.baseClass}--with-right-icon`]: icon && iconPosition === 'RIGHT',
      [`${scssObj.baseClass}--rounded`]: rounded,
      [`${scssObj.baseClass}--solid`]: !isTransparent,
      [`${scssObj.baseClass}--transparent`]: isTransparent,
    },
    `${scssObj.baseClass}--${fieldSize || 'default'}`,
  );

  return (
    <>
      {icon && iconPosition
        ? renderBackgroundIcon(icon, iconPosition, onIconClick, fieldSize)
        : null}

      <input ref={ref} className={cls} {...rest} />
      <div className={`${scssObj.baseClass}__btn`}>
        {canSubmit && (submitButton ? submitButton() : <Button type="submit">Submit</Button>)}
      </div>
    </>
  );
});

Input.defaultProps = {
  iconPosition: 'LEFT',
};

Input.displayName = 'Input';

export default Input;
