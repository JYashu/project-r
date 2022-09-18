import { withFormik } from 'formik';
import * as Yup from 'yup';
import { NPMRepoData } from '../../types';

import { Values } from './types';

type ValidatedValues = 'query' & '';

export const validationSchema = () => {
  return Yup.object().shape<Pick<Values, ValidatedValues>>({
    query: Yup.string().required('Required'),
  });
};

const initialValues = (): Values => {
  return {
    query: '',
  };
};

interface OuterProps {
  data: NPMRepoData[];
  isLoading: boolean;
  error: string | null;
  onSubmit: (values: Values) => Promise<any>;
}

export const withState = withFormik<OuterProps, Values>({
  displayName: 'Giphy',
  handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {
    const { onSubmit } = props;
    setSubmitting(true);
    onSubmit(values)
      .then(() => {
        setFieldValue('redirect', true);
        setSubmitting(false);
      })
      .catch((e) => {
        setSubmitting(false);
        console.warn('link account error', e);
      });
  },
  mapPropsToValues: () => initialValues(),
  validationSchema,
});
