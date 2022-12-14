import { Cell } from '../../types';
import ActionBar from '../actionBar';
import CodeCell from '../codeCell';
import TextEditor from '../textEditor';
import scssObj from './_CellItem.scss';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem = ({ cell }: CellListItemProps) => {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = (
      <>
        <div className={`${scssObj.baseClass}__action-bar-wrapper`}>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <div className={`${scssObj.baseClass}__action-bar-wrapper`}>
          <ActionBar id={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }

  return <div className={`${scssObj.baseClass}__cell-list-item`}>{child}</div>;
};

export default CellListItem;
