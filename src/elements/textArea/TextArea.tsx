import * as React from 'react';
import classnames from 'classnames';

import scssObj from './_TextArea.scss';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  hasLabel?: boolean;
}

const TextArea: React.SFC<Props> = ({ className, hasError, hasLabel, ...rest }: Props) => {
  const cls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--error`]: hasError,
    [`${scssObj.baseClass}--labelled`]: hasLabel,
  });

  return <textarea className={cls} {...rest} />;
};

export default TextArea;
