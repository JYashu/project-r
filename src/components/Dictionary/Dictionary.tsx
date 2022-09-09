import Draggable from 'react-draggable';
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
        <h1>{text}</h1>
      </div>
    </Draggable>
  );
};

export default Dictionary;
