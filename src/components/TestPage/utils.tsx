import { withFormik } from 'formik';
import * as Yup from 'yup';

import { Values } from './types';

type ValidatedValues = 'state' & 'value';

interface OuterProps {
  delay?: number;
  handleOpenModal: () => void;
  copyText: (text: string) => void;
}

export const validationSchema = () => {
  return Yup.object().shape<Pick<Values, ValidatedValues>>({
    query: Yup.string().required('Required'),
  });
};

const initialValues = (): Values => {
  return {
    state: '',
    value: '',
  };
};

export const withState = withFormik<OuterProps, Values>({
  displayName: 'MTBAccountLinkingForm',
  handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {
    setSubmitting(true);
  },
  mapPropsToValues: () => initialValues(),
  validationSchema,
});
