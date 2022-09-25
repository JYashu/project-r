import { Fragment, useEffect } from 'react';
import CellItem from '../CellItem';
import AddCell from '../AddCell';

import scssObj from './_CBook.scss';
import { Cell } from '../../types';

import '@fortawesome/fontawesome-free/css/all.min.css';

interface Props {
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const CellList = ({ order, data }: Props) => {
  // @ts-ignore
  const cells = order.map((id: string) => data[id]);

  // const { fetchCells } = useActions();

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

  useEffect(() => {
    // fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedCells = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <CellItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className={`${scssObj.baseClass}`}>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
