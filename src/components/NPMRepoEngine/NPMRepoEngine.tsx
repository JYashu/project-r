import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { ActiveSidebarItem, NPMRepoData } from '../../types';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../Button';
import Field from '../Field';
import NPMRepoItem from '../NPMRepoItem';
import { Values } from './types';
import scssObj from './_NPMRepoEngine.scss';

interface Props {
  data: NPMRepoData[];
  isLoading: boolean;
  error: string | null;
  isSubmitting?: boolean;
  isValid: boolean;
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
}

const NPMRepoEngine = ({
  data,
  isLoading,
  error,
  isSubmitting,
  isValid,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
}: Props) => {
  const isSubmitDisabled = !isValid || isSubmitting;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useSetGlobalHeader('NPM Engine');
  useActiveSidebarItem(ActiveSidebarItem.NPMEngine);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, []);

  return (
    <div className={`${scssObj.baseClass}`}>
      <Helmet>
        <title>NPM Engine</title>
      </Helmet>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Field
          name="query"
          placeholder="KeyWord"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.query}
          errorMessage={errors.query}
          touched={touched.query}
          canSubmit
          submitButton={() => (
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              loading={isSubmitting}
              intent="primary"
              size="small"
            >
              Search
            </Button>
          )}
        />
      </form>
      <div className={`${scssObj.baseClass}__repo-list`}>
        {error && <h3>{error}</h3>}
        {isLoading && <h3>Loading...</h3>}
        {!error && !isLoading && (
          <>
            {data.map(repo => (
              <NPMRepoItem data={repo} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NPMRepoEngine;
