import { withFormik } from 'formik';
import * as Yup from 'yup';

import { MessageProps, Values } from './types';

type ValidatedValues = 'options' & 'name';

export const validationSchema = () => {
  return Yup.object().shape<Pick<Values, ValidatedValues>>({
    options: Yup.number().required('Required'),
  });
};

const initialValues = (): Values => {
  return {
    options: 2,
    name: '',
  };
};

interface OuterProps {
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) => void;
}

export const withState = withFormik<OuterProps, Values>({
  displayName: 'MemoryLogin',
  handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {},
  mapPropsToValues: () => initialValues(),
  validationSchema,
});
