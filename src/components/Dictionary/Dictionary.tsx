/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { SpinnerType } from '../../types';
import Definition from '../Definition';
import Field from '../Field';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import scssObj from './_Dictionary.scss';

const Dictionary = ({
  selectedText,
  hideDictionary,
  isVisible,
  isLoading,
  definitions,
  getDefinitions,
}: {
  isVisible: boolean;
  isLoading: boolean;
  selectedText: string;
  definitions: any;
  hideDictionary: () => void;
  getDefinitions: (word: string) => Promise<any>;
}) => {
  const [value, setValue] = useState(selectedText);
  const [call, setCall] = useState(true);
  // const [word, setWord] = useState(selectedText);

  useEffect(() => {
    setValue(selectedText);
  }, [selectedText]);

  useEffect(() => console.log(definitions), [definitions]);

  if (!isVisible) return null;
  return (
    // <Draggable>
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__header`}>
        <div className={`${scssObj.baseClass}__title`}>Dictionary</div>
        <Icon
          className={`${scssObj.baseClass}__icon-close`}
          icon="close"
          size="small"
          onClickHandler={() => hideDictionary()}
        />
      </div>
      <div className={`${scssObj.baseClass}__content`}>
        <Field name="word" value={value} onChange={e => setValue(e.target.value)} />
        <div className={`${scssObj.baseClass}__result`}>
          {isLoading ? (
            <div className={`${scssObj.baseClass}__spinner`}>
              <LoadingSpinner type={SpinnerType.BoxLoadingSpinner} />
            </div>
          ) : (
            <>
              {definitions.length > 0 &&
                definitions.map(definition => {
                  return <Definition definition={definition} />;
                })}
            </>
          )}
        </div>
      </div>
    </div>
    // </Draggable>
  );
};

export default Dictionary;
