/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { CellTypes, Direction } from '../../types';
import Icon from '../Icon';
import scssObj from './_ActionBar.scss';

interface Props {
  id: string;
  cellType: CellTypes;
  visibilityIcon: string;
  moveCell: (direction: Direction) => void;
  togglePreview: () => void;
  handleConfirmation: () => void;
}

const ActionBar = ({
  id,
  cellType,
  visibilityIcon,
  moveCell,
  togglePreview,
  handleConfirmation,
}: Props) => {
  return (
    <div className={`${scssObj.baseClass}`}>
      <div
        className={classNames(`${scssObj.baseClass}__action-bar`, `${scssObj.baseClass}__right`)}
      >
        {cellType === 'code' && (
          <div className={`${scssObj.baseClass}__icon-wrapper`}>
            <Icon
              className={`${scssObj.baseClass}__icon`}
              icon={visibilityIcon}
              size="small"
              onClickHandler={() => togglePreview()}
            />
          </div>
        )}
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="arrow_upward"
          size="small"
          onClickHandler={() => moveCell('up')}
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="arrow_downward"
          size="small"
          onClickHandler={() => moveCell('down')}
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="close"
          size="small"
          onClickHandler={() => handleConfirmation()}
        />
      </div>
    </div>
  );
};

export default ActionBar;
