import classnames from 'classnames';
import { useState } from 'react';
import useTimeout from '../../hooks/useTimeout';
import { ActiveSidebarItem, SpinnerType } from '../../types';
import { FULLSTORY_EXCLUDE_CLASS } from '../../utils/consts';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../Button';
import { StateDropdown } from '../Dropdown';
import Field from '../Field';
import LoadingSpinner from '../LoadingSpinner';
import { Values } from './types';
import scssObj from './_TestPage.scss';
import { v4 as uuidv4 } from 'uuid';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';

interface Props {
  delay?: number;
  isSubmitting?: boolean;
  isValid: boolean;
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  setFieldValue: (
    field: string,
    value?: any,
    shouldValidate?: boolean | undefined
  ) => void;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleOpenModal: () => void;
  copyText: (text: string) => void;
}

const TestApp = ({
  delay,
  isSubmitting,
  isValid,
  values,
  errors,
  touched,
  setFieldValue,
  handleBlur,
  handleChange,
  handleOpenModal,
  copyText,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState('');
  const [value, setValue] = useState('');

  useActiveSidebarItem(ActiveSidebarItem.Test);
  useSetGlobalHeader('Test Page');

  useTimeout(() => setLoading(false), delay || 1800);

  if (loading) {
    return (
      <div className={`${scssObj.baseClass}__spinner`}>
        <LoadingSpinner type={SpinnerType.CubeFlipSpinner} />
      </div>
    );
  }

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__container`}>
        <div className={`${scssObj.baseClass}__glass`}>
          <div className={`${scssObj.baseClass}__wrapper`}>
            <div className={`${scssObj.baseClass}__head`}>Test Page</div>
          </div>
          <Button
            intent="primary"
            icon="file_download"
            onClick={handleOpenModal}
          >{`Click Me`}</Button>

          <div className={`${scssObj.baseClass}__glitch`}>
            <Button intent="primary" onClick={() => copyText(uuidv4())}>
              Generate UUID
            </Button>
          </div>
          <div className={`${scssObj.baseClass}__fields`}>
            <Field
              // disabled={viewOnly}
              className={classnames(
                `${scssObj.baseClass}__state`,
                FULLSTORY_EXCLUDE_CLASS
              )}
              // errorMessage={errors?.state}
              name="state"
              touched={touched?.state}
              value={values.state}
              label="State"
            >
              {(fieldName) => (
                <StateDropdown
                  className={`${scssObj.baseClass}__states-dropdown`}
                  handleBlur={() => setState(fieldName)}
                  handleChange={(option) => {
                    if (!option) {
                      setFieldValue(fieldName, '');
                      return;
                    }

                    const { value } = option;
                    setFieldValue(fieldName, value);
                  }}
                  name={fieldName}
                  hasLabel={!!values.state}
                  isClearable
                  value={values.state}
                />
              )}
            </Field>
            <Field
              name="value"
              value={values.value}
              placeholder="placeholder"
              label="label"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestApp;
