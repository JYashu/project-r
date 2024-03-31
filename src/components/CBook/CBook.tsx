import classNames from 'classnames';
import { Fragment, useEffect } from 'react';
import { CellTypes, Cell } from '../../types';
import Button from '../../elements/button';
import CellItem from '../cellItem';

import scssObj from './_CBook.scss';
import { FileField } from '../../elements/field';
import { FileType, FileObj } from '../../elements/field/types';
import { getFileAsText } from '../../utils/helpers';

interface Props {
  order: string[];
  data: {
    [key: string]: Cell;
  };
  insertCellAfter: (id: string | null, cellType: CellTypes) => void;
  loadFile: (content: string, resetBook: boolean) => void;
  addSnackbar: (message: string) => void;
}

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
  insertCellAfter: (id: string | null, cellType: CellTypes) => void;
}

const Toolbar = ({
  order,
  data,
  loadFile,
  addSnackbar,
}: {
  order: string[];
  data: {};
  loadFile: (content: string, resetBook: boolean) => void;
  addSnackbar: (message: string) => void;
}) => {
  const onDownloadClick = () => {
    if (order.length === 0) {
      addSnackbar('No Cells to Download');
      return;
    }
    const fileBlob = new Blob([JSON.stringify({ order, data })], {
      type: 'text/plain;charset=utf-8',
    });
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(fileBlob);
    const fileName = 'untitled.cbk';
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onFileUpload = (fileObj?: FileObj, resetBook = true) => {
    if (fileObj && fileObj.file) {
      getFileAsText(fileObj.file).then((result) => loadFile(result, resetBook));
    }
  };

  return (
    <div className={`${scssObj.baseClass}__menu`}>
      <FileField
        minimal
        destroyDataPostLoad
        onFileUpload={onFileUpload}
        acceptedTypes={[FileType.TEXT, FileType.CBOOK]}
        renderButton={() => (
          <Button className={`${scssObj.baseClass}__button`} buttonStyle="minimal" icon="terminal">
            Load File
          </Button>
        )}
      />
      <FileField
        minimal
        destroyDataPostLoad
        onFileUpload={(fileObj?: FileObj) => onFileUpload(fileObj, false)}
        acceptedTypes={[FileType.TEXT, FileType.CBOOK]}
        renderButton={() => (
          <Button
            className={`${scssObj.baseClass}__button`}
            buttonStyle="minimal"
            icon="data_object"
          >
            Load Cell
          </Button>
        )}
      />
      <Button
        className={`${scssObj.baseClass}__button`}
        buttonStyle="minimal"
        icon="download"
        onClick={onDownloadClick}
      >
        Download
      </Button>
    </div>
  );
};

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

const CBook = ({ order, data, insertCellAfter, loadFile, addSnackbar }: Props) => {
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
      <Toolbar order={order} data={data} loadFile={loadFile} addSnackbar={addSnackbar} />
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
