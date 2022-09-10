import { useState } from 'react';
import Draggable from 'react-draggable';
import Field from '../Field';
import Icon from '../Icon';
import scssObj from './_Dictionary.scss';

const Dictionary = ({
  selectedText,
  hideDictionary,
  isVisible,
}: {
  isVisible: boolean;
  selectedText?: string;
  hideDictionary: () => void;
}) => {
  const [value, setValue] = useState(selectedText || '');
  const text = selectedText || 'Dictionary';
  if (!isVisible) return null;
  return (
    <Draggable>
      <div className={`${scssObj.baseClass}`}>
        <div className={`${scssObj.baseClass}__header`}>
          <div className={`${scssObj.baseClass}__title`}>Dictionary</div>
          <Icon
            className={`${scssObj.baseClass}__icon-close`}
            icon="close"
            size="small"
            onClickHandler={() => hideDictionary()}
          />
        </div>
        <Field name="text" value={value} onChange={() => setValue(value)} />
      </div>
    </Draggable>
  );
};

export default Dictionary;
