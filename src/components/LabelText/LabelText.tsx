import React from 'react';
import classnames from 'classnames';

import scssObj from './_LabelText.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const LabelText = ({ className, children }: Props) => (
  <span className={classnames(scssObj.baseClass, className)}>{children}</span>
);

export default LabelText;
