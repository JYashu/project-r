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

  const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
    if (!el) return window;
    const style = getComputedStyle(el);
    const { overflowY } = style;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return el;
    }
    return getScrollParent(el.parentElement);
  };

  const moveCellWithScroll = (direction: Direction, cursorY?: number, target?: HTMLElement) => {
    moveCell(direction);

    if (cursorY !== undefined && target) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const rect = target.getBoundingClientRect();
          const buttonCenter = rect.top + rect.height / 2;

          const deltaY = buttonCenter - cursorY;

          const scrollParent = getScrollParent(target);

          if (scrollParent instanceof Window) {
            scrollParent.scrollBy({ top: deltaY, behavior: 'auto' });
          } else {
            scrollParent.scrollTop += deltaY;
          }
        });
      });
    }
  };

  const handleMoveClick = (direction: Direction, e: React.MouseEvent) => {
    const cursorY = e.clientY;
    const target = e.currentTarget as HTMLElement; // the clicked <Icon />
    moveCellWithScroll(direction, cursorY, target);
  };

  return (
    <div className={`${scssObj.baseClass}`} data-cell-id={id}>
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
          dataRole="move-up"
          onClickHandler={(e) => handleMoveClick('up', e)}
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="arrow_downward"
          size="small"
          dataRole="move-down"
          onClickHandler={(e) => handleMoveClick('down', e)}
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
