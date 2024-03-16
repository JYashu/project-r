import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FileType } from '../../elements/field/types';

import { Values } from './types';

interface OuterProps {
  setFields: (from: FileType, to: FileType) => void;
}

type ValidatedValues = 'fromField' & 'toField';

export const validationSchema = () => {
  return Yup.object().shape<Pick<Values, ValidatedValues>>({
    fromField: Yup.string().required('* Required'),
    toField: Yup.string().required('* Required'),
  });
};

const mapPropsToValues = (): Values => {
  return {
    fromField: '',
    toField: '',
  };
};

export const withState = withFormik<OuterProps, Values>({
  displayName: 'IMGConverter',
  handleSubmit: (values, { props }) => {
    if (values.fromField !== '' && values.toField !== '')
      props.setFields(values.fromField, values.toField);
  },
  mapPropsToValues,
  validationSchema,
});
