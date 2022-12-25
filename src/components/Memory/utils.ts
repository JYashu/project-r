import { withFormik } from 'formik';
import * as Yup from 'yup';
import { CardTheme } from './const';
import ENV from '../../utils/env';

import { MessageProps, Values } from './types';

type ValidatedValues = 'options' & 'theme';

export const validationSchema = () => {
  return Yup.object().shape<Pick<Values, ValidatedValues>>({
    options: Yup.number().min(2, 'Required').required('Required'),
    theme: Yup.string().required('Required'),
  });
};

const initialValues = (): Values => {
  return {
    options: ENV.isDevelopment ? 2 : 12,
    name: '',
    theme: CardTheme.Solid,
  };
};

interface OuterProps {
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) => void;
  openImage: (url: string) => void;
}

export const withState = withFormik<OuterProps, Values>({
  displayName: 'MemoryLogin',
  handleSubmit: () => {},
  mapPropsToValues: () => initialValues(),
  validationSchema,
});
