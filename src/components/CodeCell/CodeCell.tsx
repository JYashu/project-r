/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useCumulativeCode } from '../../hooks/useCumulativeCode';
import { createBundle } from '../../redux/cbook';
import { Cell, SpinnerType } from '../../types';
import Bundle from '../../utils/bundler';
import LoadingSpinner from '../LoadingSpinner';
import Resizable from '../Resizable';
import Icon from '../Icon';
import scssObj from './_CodeCell.scss';
import { HTML } from '../../utils/consts';

interface Props {
  cell: Cell;
  bundle?: {
    processing: boolean;
    code: string;
    error: string;
  };
  updateCell: (id: string, content: string) => void;
}

interface PreviewProps {
  code: string;
  status: string;
}

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  runCode: () => void;
}

const Preview = ({ code, status }: PreviewProps) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = HTML;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className={`${scssObj.baseClass}__preview-wrapper`}>
      <iframe
        className={`${scssObj.baseClass}__preview-pane`}
        title={`${scssObj.baseClass}__code-preview`}
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={HTML}
      />
      {status && <div className={`${scssObj.baseClass}__preview-error`}>{status}</div>}
    </div>
  );
};

const CodeEditor = ({ initialValue, onChange, runCode }: CodeEditorProps) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue: any, editor: any) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unFormatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unFormatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };

  return (
    <div className={`${scssObj.baseClass}__editor-wrapper`}>
      <div className={`${scssObj.baseClass}__action-buttons`}>
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="play_arrow"
          size="small"
          onClickHandler={runCode}
          removeOutline
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="code"
          size="small"
          onClickHandler={onFormatClick}
        />
      </div>
      <Editor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 12,
          scrollBeyondLastLine: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

const CodeCell = ({ cell, bundle, updateCell }: Props) => {
  const cumulativeCode = useCumulativeCode(cell.id);
  const [runCode, setRunCode] = useState(false);

  const dispatch = useDispatch();

  const bundler = async () => {
    dispatch(createBundle.request({ cellId: cell.id, input: cumulativeCode }));

    const result = await Bundle(cumulativeCode);

    dispatch(createBundle.success({ cellId: cell.id, bundle: result }));
  };

  useEffect(() => {
    if (runCode) {
      setRunCode(false);
      bundler();
    }
  }, [runCode]);

  useEffect(() => {
    if (!bundle) {
      bundler();
      return;
    }
    const timer = setTimeout(async () => {
      bundler();
    }, 750);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, cell.id]);

  return (
    <Resizable direction="vertical">
      <div className={`${scssObj.baseClass}__code-cell`}>
        {cell.showPreview ? (
          <>
            <Resizable direction="horizontal">
              <CodeEditor
                initialValue={cell.content}
                runCode={() => setRunCode(true)}
                onChange={value => updateCell(cell.id, value)}
              />
            </Resizable>
            <div className={`${scssObj.baseClass}__progress-wrapper`}>
              {!bundle || bundle.processing ? (
                <div className={`${scssObj.baseClass}__progress-cover`}>
                  <LoadingSpinner type={SpinnerType.PropagateLoader} />
                </div>
              ) : (
                <Preview code={bundle.code} status={bundle.error} />
              )}
            </div>
          </>
        ) : (
          <CodeEditor
            initialValue={cell.content}
            runCode={() => setRunCode(true)}
            onChange={value => updateCell(cell.id, value)}
          />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;

// import React, { useState } from 'react';

// const Component = () => {
//   return <h1>Component</h1>;
// };

// show(<Component />);

// const App = () => {
//   const [list, setList] = useState([]);

//   const addComponent = (action) => {
//     if (action === 'add') {
//       setList(list.concat(Math.random()));
//     } else if (list.length > 0) {
//       list.pop();
//       setList([...list]);
//     }
//   };

//   const moves = list.map((step, move) => {
//     return (
//       <div key={move}>
//         <Component />
//       </div>
//     );
//   });

//   return (
//     <div>
//       {moves}
//       <button onClick={() => addComponent('add')}>Add</button>
//       <button onClick={() => addComponent('rmv')}>Remove</button>
//     </div>
//   );
// };

// show(<App />);
