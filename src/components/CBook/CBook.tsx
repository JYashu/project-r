/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { Fragment, useEffect } from 'react';
import { CellTypes, Cell } from '../../types';
import Button from '../Button';
import CellItem from '../CellItem';

import scssObj from './_CBook.scss';

interface Props {
  order: string[];
  data: {
    [key: string]: Cell;
  };
  insertCellAfter: (id: string | null, cellType: CellTypes) => void;
}

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

const CBook = ({ order, data, insertCellAfter }: Props) => {
  const cells = order.map((id: string) => data[id]);

  useEffect(() => {
    if (cells.length === 0) return;
    const unloadCallback = (event: any) => {
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, [cells]);

  const renderedCells = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <CellItem cell={cell} />
      <AddCell prevCellId={cell.id} insertCellAfter={insertCellAfter} />
    </Fragment>
  ));

  return (
    <div className={`${scssObj.baseClass}`}>
      <AddCell
        forceVisible={cells.length === 0}
        prevCellId={null}
        insertCellAfter={insertCellAfter}
      />
      {renderedCells}
    </div>
  );
};

export default CBook;
