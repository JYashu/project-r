import classnames from 'classnames';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../elements/button';
import Icon from '../../elements/icon';
import scssObj from './_Confirmation.scss';

interface Props {
  className?: string;
  content: React.ReactNode | string;
  handleCancel: () => void;
  handleContinue: () => void;
  icon?: string;
  title: string;
  cancelText?: string;
  continueText?: string;
  hasBackButton?: boolean;
  dark?: boolean;
}

const DoubleConfirmation = ({
  content,
  className,
  handleCancel,
  handleContinue,
  icon,
  title,
  cancelText,
  continueText,
  hasBackButton,
  dark,
}: Props) => {
  const newContent =
    typeof content === 'string'
      ? content.split('\n').map((p) => <p key={uuidv4()}>{p}</p>)
      : content;

  return (
    <div className={classnames(scssObj.baseClass, className)}>
      <header aria-label="double-confirm-header">
        <h2 className={`${scssObj.baseClass}__header`}>
          {icon && <Icon className={`${scssObj.baseClass}__icon`} icon={icon} />}

          {title}
        </h2>
      </header>

      <section
        aria-label="double-confirm-section"
        className={`${scssObj.baseClass}__content${dark ? '-dark' : ''}`}
      >
        {newContent}
      </section>

      <footer
        aria-label="double-confirm-footer"
        className={`${scssObj.baseClass}__footer${dark ? '-dark' : ''}`}
      >
        {hasBackButton ? (
          <Button onClick={handleCancel} icon="arrow_back">
            Back
          </Button>
        ) : (
          <Button onClick={handleCancel}>{cancelText || `Cancel`} </Button>
        )}

        <Button onClick={handleContinue} intent="primary">
          {continueText || `Continue`}
        </Button>
      </footer>
    </div>
  );
};

export default DoubleConfirmation;
