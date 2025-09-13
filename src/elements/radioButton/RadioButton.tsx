import classnames from 'classnames';
import React from 'react';
import LabelText from '../labelText';

import scssObj from './_RadioButton.scss';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label?: string;
  light?: boolean;
}

const RadioButton = ({
  id,
  onChange,
  value,
  checked,
  label,
  className,
  name,
  disabled,
  light,
}: Props) => {
  const cls = classnames(scssObj.baseClass, className);

  const labelCls = classnames(`${scssObj.baseClass}__label`, {
    [`${scssObj.baseClass}__label--disabled`]: disabled,
    [`${scssObj.baseClass}__label--light`]: light,
  });

  return (
    <label className={cls} htmlFor={name}>
      <input
        type="radio"
        className={`${scssObj.baseClass}__radio`}
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
      {label && <LabelText className={labelCls}>{label}</LabelText>}
    </label>
  );
};

export default RadioButton;
