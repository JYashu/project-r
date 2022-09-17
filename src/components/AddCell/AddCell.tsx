/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { CellTypes } from '../../types';
import Button from '../Button';
import scssObj from './_AddCell.scss';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
  insertCellAfter: (id: string | null, cellType: CellTypes) => void;
}

const AddCell = ({ forceVisible, prevCellId, insertCellAfter }: AddCellProps) => {
  return (
    <div
      className={classNames(`${scssObj.baseClass}__add-cell`, `${forceVisible && 'force-visible'}`)}
    >
      <div className={`${scssObj.baseClass}__add-buttons`}>
        <Button
          className={`${scssObj.baseClass}__add-button`}
          rounded
          buttonStyle="minimal"
          icon="add"
          iconSize="small"
          onClick={() => insertCellAfter(prevCellId, 'md')}
        >
          <span>Text</span>
        </Button>
        <Button
          className={`${scssObj.baseClass}__add-button`}
          rounded
          buttonStyle="minimal"
          icon="add"
          iconSize="small"
          onClick={() => insertCellAfter(prevCellId, 'code')}
        >
          <span>Code</span>
        </Button>
      </div>
      <div className={`${scssObj.baseClass}__divider`} />
    </div>
  );
};

export default AddCell;
