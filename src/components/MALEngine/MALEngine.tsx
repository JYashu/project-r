import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import Button from '../../elements/button';
import Field from '../../elements/field';
import { Values } from './types';
import scssObj from './_MALEngine.scss';
import PermissionsManager from '../../elements/permissionsManager';

interface Props {
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

const MALEngine = ({
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
  return (
    <div className={`${scssObj.baseClass}`}>
      <form
        onSubmit={(e) => {
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
    </div>
  );
};

const MALEngineWithPermissionsManager = (props: Props) => {
  return (
    <PermissionsManager isBetaOnly>
      <MALEngine {...props} />
    </PermissionsManager>
  );
};

export default MALEngineWithPermissionsManager;
