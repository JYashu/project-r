/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../../types';
import scssObj from './_TextEditor.scss';
// import './_TextEditor.css';

interface Props {
  cell: Cell;
  updateCell: (id: string, content: string) => void;
}

const TextEditor = ({ cell, updateCell }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className={classNames(`${scssObj.baseClass}`, 'text-editor')} ref={ref}>
        <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || '')} />
      </div>
    );
  }

  return (
    <div
      className={classNames(`${scssObj.baseClass}__md`, 'text-editor card')}
      onClick={() => setEditing(true)}
    >
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || '### Click to edit.'} />
      </div>
    </div>
  );
};

export default TextEditor;
