import React from 'react';
import classnames from 'classnames';

import scssObj from './_FieldError.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const FieldError = ({ children, className }: Props) => (
  <p className={classnames(scssObj.baseClass, className)}>{children}</p>
);

export default FieldError;
