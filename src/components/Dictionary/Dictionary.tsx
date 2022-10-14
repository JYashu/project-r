/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Definition, SpinnerType } from '../../types';
import Button from '../../elements/button';
import DefinitionItem from '../definition';
import Field from '../../elements/field';
import Icon from '../../elements/icon';
import LoadingSpinner from '../../elements/loadingSpinner';
import scssObj from './_Dictionary.scss';

interface Props {
  isVisible: boolean;
  isLoading: boolean;
  selectedText: string;
  definitions: Definition[];
  error: string | null;
  hideDictionary: () => void;
  getDefinitions: (word: string) => Promise<any>;
}

const Dictionary = ({
  selectedText,
  hideDictionary,
  isVisible,
  isLoading,
  definitions,
  error,
  getDefinitions,
}: Props) => {
  const [value, setValue] = useState(selectedText);
  const [call, setCall] = useState(true);
  const [i, setI] = useState(0);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInput && searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  useEffect(() => {
    setValue(selectedText);
  }, [selectedText]);

  useEffect(() => setI(0), [definitions]);

  if (!isVisible) return null;
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__header`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getDefinitions(value);
          }}
        >
          <Field
            name="word"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            border
            canSubmit
            ref={searchInput}
            submitButton={() => {
              return (
                <div style={{ marginTop: '2px', marginRight: '-4px' }}>
                  <Button onClick={() => hideDictionary()}>
                    <Icon
                      className={`${scssObj.baseClass}__icon-close`}
                      icon="close"
                      size="small"
                    />
                  </Button>
                </div>
              );
            }}
          />
        </form>
      </div>
      <div className={`${scssObj.baseClass}__content`}>
        {isLoading && (
          <div className={`${scssObj.baseClass}__spinner`}>
            <LoadingSpinner type={SpinnerType.BoxLoadingSpinner} />
          </div>
        )}
        {!isLoading && definitions.length === 0 && !error && (
          <div className={`${scssObj.baseClass}__search`}>
            Type a word and press &apos;Enter&apos; to get its meaning.
          </div>
        )}
        {error && <div className={`${scssObj.baseClass}__error`}>{error}</div>}
        {definitions.length > 0 && (
          <div className={`${scssObj.baseClass}__result`}>
            <DefinitionItem definition={definitions[i]} />
          </div>
        )}
      </div>
      {definitions.length > 0 && (
        <div className={`${scssObj.baseClass}__footer`}>
          <Button disabled={i === 0} onClick={() => setI(i - 1)}>
            <Icon
              className={`${scssObj.baseClass}__left-arrow`}
              icon="arrow_right_alt"
              size="small"
              description="Previous"
            />
          </Button>
          <Button disabled={i === definitions.length - 1} onClick={() => setI(i + 1)}>
            <Icon icon="arrow_right_alt" size="small" description="Next" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
