import { withFormik } from 'formik';
import * as Yup from 'yup';
import { CardTheme } from './const';
import ENV from '../../utils/env';

import { MessageProps, Values } from './types';
import { ACCESS_TOKEN } from '../../utils/consts';

type ValidatedValues = 'options' & 'theme';

interface OuterProps {
  devAccess: boolean;
}

export const validationSchema = () => {
  return Yup.object().shape<Pick<Values, ValidatedValues>>({
    options: Yup.number().min(2, 'Required').required('Required'),
    theme: Yup.string().required('Required'),
  });
};

const mapPropsToValues = ({ devAccess }: OuterProps): Values => {
  return {
    options: ENV.isDevelopment || devAccess ? 2 : 12,
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
  mapPropsToValues,
  validationSchema,
});
