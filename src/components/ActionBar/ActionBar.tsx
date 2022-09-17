/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { CellTypes, Direction } from '../../types';
import Icon from '../Icon';
import scssObj from './_ActionBar.scss';

interface Props {
  id: string;
  cellType: CellTypes;
  visibilityIcon: string;
  moveCell: (id: string, direction: Direction) => void;
  deleteCell: (id: string) => void;
  togglePreview: (id: string) => void;
}

const ActionBar = ({
  id,
  cellType,
  visibilityIcon,
  moveCell,
  deleteCell,
  togglePreview,
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
              onClickHandler={() => togglePreview(id)}
            />
          </div>
        )}
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="arrow_upward"
          size="small"
          onClickHandler={() => moveCell(id, 'up')}
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="arrow_downward"
          size="small"
          onClickHandler={() => moveCell(id, 'down')}
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="close"
          size="small"
          onClickHandler={() => deleteCell(id)}
        />
      </div>
    </div>
  );
};

export default ActionBar;
