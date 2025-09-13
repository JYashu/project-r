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
import LoadingSpinner from '../../elements/loadingSpinner';
import Resizable from '../../elements/resizable';
import Icon from '../../elements/icon';
import scssObj from './_CodeCell.scss';
import { getHTML } from '../../utils/consts';
import { copyText } from '../../redux/me';

interface Props {
  cell: Cell;
  bundle?: { processing: boolean; code: string; error: string };
  updateCell: (id: string, content: string) => void;
}

interface PreviewProps {
  code: string;
  status: string;
  isResizing: boolean;
  cellId: string;
}

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  runCode: () => void;
}

const Preview = ({ code, status, isResizing, cellId }: PreviewProps) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.type === 'ready' && event.data.cellId === cellId) {
        setReady(true);
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [cellId]);

  // Reset iframe HTML whenever cell changes
  useEffect(() => {
    if (iframe.current) {
      setReady(false);
      iframe.current.srcdoc = getHTML(cellId);
    }
  }, [cellId]);

  // Only send code once iframe is ready
  useEffect(() => {
    if (iframe.current && ready) {
      iframe.current.contentWindow?.postMessage(code, '*');
    }
  }, [code, ready]);

  return (
    <div className={`${scssObj.baseClass}__preview-wrapper`}>
      {isResizing && <div className={`${scssObj.baseClass}__iframe-overlay`} />}
      <iframe
        className={`${scssObj.baseClass}__preview-pane`}
        title={`${scssObj.baseClass}__code-preview`}
        ref={iframe}
        sandbox="allow-scripts"
      />
      {status && <div className={`${scssObj.baseClass}__preview-error`}>{status}</div>}
    </div>
  );
};

const CodeEditor = ({ initialValue, onChange, runCode }: CodeEditorProps) => {
  const editorRef = useRef<any>();
  const dispatch = useDispatch();

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

  const onCopyClick = () => {
    dispatch(copyText.request({ text: editorRef.current.getModel().getValue() }));
  };

  return (
    <div className={`${scssObj.baseClass}__editor-wrapper`}>
      <div className={`${scssObj.baseClass}__action-buttons`}>
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="play_arrow"
          size="small"
          onClickHandler={runCode}
          title="Run Code"
          removeOutline
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="code"
          size="small"
          onClickHandler={onFormatClick}
          title="Format Code"
        />
        <Icon
          className={`${scssObj.baseClass}__icon`}
          icon="copy"
          size="small"
          onClickHandler={onCopyClick}
          title="Copy Code"
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
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

const CodeCell = ({ cell, bundle, updateCell }: Props) => {
  const cumulativeCode = useCumulativeCode(cell.id);
  const [runCode, setRunCode] = useState(false);
  const [isResizing, setResizing] = useState(false);
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
    <Resizable
      onResizeStart={() => setResizing(true)}
      onResizeStop={() => setResizing(false)}
      direction="vertical"
    >
      <div className={`${scssObj.baseClass}__code-cell`}>
        {cell.showPreview ? (
          <>
            <Resizable
              onResizeStart={() => setResizing(true)}
              onResizeStop={() => setResizing(false)}
              direction="horizontal"
            >
              <CodeEditor
                initialValue={cell.content}
                runCode={() => setRunCode(true)}
                onChange={(value) => updateCell(cell.id, value)}
              />
            </Resizable>
            <div
              className={`${scssObj.baseClass}__progress-wrapper`}
              style={{ position: 'relative' }}
            >
              <Preview
                isResizing={isResizing}
                code={bundle?.code || ''}
                status={bundle?.error || ''}
                cellId={cell.id}
              />
              {(!bundle || bundle.processing) && (
                <div
                  className={`${scssObj.baseClass}__progress-cover`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                  }}
                >
                  <LoadingSpinner type={SpinnerType.CubeFlipSpinner} />
                </div>
              )}
            </div>
          </>
        ) : (
          <CodeEditor
            initialValue={cell.content}
            runCode={() => setRunCode(true)}
            onChange={(value) => updateCell(cell.id, value)}
          />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
