import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { CellTypes, Direction } from '../../types';
import Icon from '../../elements/icon';
import scssObj from './_ActionBar.scss';
import { selectCellContentById } from '../../redux/cbook';

interface Props {
  id: string;
  cellType: CellTypes;
  visibilityIcon: string;
  moveCell: (direction: Direction) => void;
  togglePreview: () => void;
  deleteCell: () => void;
  handleConfirmation: () => void;
}

const ActionBar = ({
  id,
  cellType,
  visibilityIcon,
  moveCell,
  togglePreview,
  deleteCell,
  handleConfirmation,
}: Props) => {
  const cellContent = useSelector(selectCellContentById({ id }));

  const handleCloseClick = () => {
    if (cellContent !== null && cellContent !== '') handleConfirmation();
    else deleteCell();
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={classNames(`${scssObj.baseClass}__action-bar`, `${scssObj.baseClass}__left`)}>
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="close"
          size="small"
          onClickHandler={() => handleCloseClick()}
        />
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
      </div>
    </div>
  );
};

export default ActionBar;
