import React from 'react';
import classnames from 'classnames';

import { FULLSTORY_EXCLUDE_CLASS } from '../../utils/consts';

import scssObj from './_Field.scss';

import FieldError from '../fieldError';
import Input from '../input';
import LabelText from '../labelText';
import TextArea from '../textArea';

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'ref'> {
  children?: (
    name: string,
    props: Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'ref'>,
  ) => React.ReactNode;
  description?: string;
  fsExcludeDescription?: boolean;
  errorMessage?: string;
  errorClassName?: string;
  icon?: string;
  onIconClick?: () => void;
  iconPosition?: 'LEFT' | 'RIGHT';
  inputClassName?: string;
  label?: string;
  name: string;
  textArea?: boolean;
  touched?: boolean;
  ref?: any;
  rounded?: boolean;
  canSubmit?: boolean;
  isTransparent?: boolean;
  noBorder?: boolean;
  fieldSize?: 'small';
  submitButton?: () => React.ReactNode;
}

const Field: React.SFC<Props> = React.forwardRef((props: Props, ref: any) => {
  const {
    children,
    className,
    description,
    fsExcludeDescription,
    errorClassName,
    errorMessage,
    icon,
    onIconClick,
    iconPosition,
    inputClassName,
    label,
    name,
    textArea,
    touched,
    value,
    rounded,
    canSubmit,
    isTransparent,
    submitButton,
    noBorder,
    fieldSize,
    ...rest
  } = props;
  const hasValue = value !== null && value !== undefined && value !== '';
  // validation will not show up unless field was touched and focus was lost after that.
  const hasError = !!errorMessage && !!touched;

  const cls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--has-error`]: hasError,
    [`${scssObj.baseClass}--has-children`]: children !== undefined,
    [`${scssObj.baseClass}--text-area`]: textArea,
    [`${scssObj.baseClass}--rounded`]: rounded,
    [`${scssObj.baseClass}--solid`]: !isTransparent,
    [`${scssObj.baseClass}--transparent`]: isTransparent,
    [`${scssObj.baseClass}--border`]: !noBorder,
  });

  const labelCls = classnames(`${scssObj.baseClass}__label`, {
    [`${scssObj.baseClass}__label--with-left-icon`]:
      icon && !textArea && (iconPosition === 'LEFT' || iconPosition === undefined),
    [`${scssObj.baseClass}__label--with-right-icon`]: icon && !textArea && iconPosition === 'RIGHT',
    [`${scssObj.baseClass}__label--hidden`]: !hasValue && !!label,
  });

  const errorCls = classnames(`${scssObj.baseClass}__error`, errorClassName);

  const restProps = {
    ...rest,
    id: name,
    className: inputClassName,
    hasError,
    hasLabel: !!value && !!label,
    icon,
    onIconClick,
    value,
    rounded,
    isTransparent,
    canSubmit,
    submitButton,
    fieldSize,
  };

  const textInput = textArea ? (
    <TextArea {...restProps} />
  ) : (
    <Input ref={ref} {...restProps} iconPosition={iconPosition} />
  );

  const descriptionClassNames = classnames(`${scssObj.baseClass}__description`, {
    [`${FULLSTORY_EXCLUDE_CLASS}`]: fsExcludeDescription,
  });

  return (
    <label className={cls} htmlFor={name}>
      {label && <LabelText className={labelCls}>{label}</LabelText>}

      {children ? children(name, { ...restProps }) : textInput}

      {description && !hasError && <p className={descriptionClassNames}>{description}</p>}

      {hasError && <FieldError className={errorCls}>{errorMessage}</FieldError>}
    </label>
  );
});

Field.displayName = 'Field';

export default Field;
