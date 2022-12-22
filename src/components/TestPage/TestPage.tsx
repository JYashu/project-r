import classnames from 'classnames';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useTimeout from '../../hooks/useTimeout';
import { ActiveSidebarItem, SpinnerType } from '../../types';
import { FULLSTORY_EXCLUDE_CLASS } from '../../utils/consts';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../../elements/button';
import { StateDropdown } from '../../elements/dropdown';
import Field from '../../elements/field';
import LoadingSpinner from '../../elements/loadingSpinner';
import scssObj from './_TestPage.scss';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSpeechSynthesis from '../../hooks/useSpeechSynthesis';
import Link from '../../elements/link';
import { Values } from './types';
import PermissionsManager from '../../elements/permissionsManager';

interface Props {
  delay?: number;
  isSubmitting?: boolean;
  isValid: boolean;
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  setFieldValue: (field: string, value?: any, shouldValidate?: boolean | undefined) => void;
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

  useActiveSidebarItem(ActiveSidebarItem.Test);
  useSetGlobalHeader('Test Page');

  useTimeout(() => setLoading(false), delay || 1800);

  const Speak = (text: string) => {
    useSpeechSynthesis(text);
  };

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
          <Button intent="primary" icon="open" onClick={handleOpenModal}>
            Open Model
          </Button>

          <Link to="/sdf">404</Link>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              Speak(values.value);
            }}
          >
            <Field
              className={`${scssObj.baseClass}__field`}
              name="value"
              value={values.value}
              placeholder="Text to Speech"
              label="Text to Speech"
              onChange={handleChange}
            />
          </form>

          <div className={`${scssObj.baseClass}__glitch`}>
            <Button buttonStyle="blur" onClick={() => copyText(uuidv4())}>
              Generate UUID
            </Button>
          </div>
          <div className={`${scssObj.baseClass}__fields`}>
            <Field
              // disabled={viewOnly}
              className={classnames(`${scssObj.baseClass}__state`, FULLSTORY_EXCLUDE_CLASS)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

const TestAppWithPermissionsManager = (props: Props) => {
  return (
    <PermissionsManager isBetaOnly>
      <TestApp {...props} />
    </PermissionsManager>
  );
};

export default TestAppWithPermissionsManager;
