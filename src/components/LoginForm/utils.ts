import { withFormik } from 'formik';
import * as Yup from 'yup';

// import { EMAIL } from '../../utils/validations/messages';
import { User } from '../../types';

export interface Values {
  username: string;
  password: string;
}

type ValidatedValues = 'username' & 'password';

interface OuterProps {
  user: User | null;
  onSubmit: (username: string, password: string) => Promise<unknown>;
  email?: string | string[];
  // verifiedUser: User;
}

export const validationSchema = () =>
  Yup.object().shape<Pick<Values, ValidatedValues>>({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

const mapPropsToValues = ({ user }: OuterProps) => {
  return {
    username: user?.email || '',
    password: '',
  };
};

export const withState = withFormik<OuterProps, Values>({
  displayName: 'LoginForm',
  enableReinitialize: true,
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      // setError
    },
  ) => {
    const { onSubmit } = props;
    // setSubmitting(true);

    onSubmit(values.username, values.password);
    // .then(() => {
    //   setSubmitting(false);
    // })
    // .catch((e) => {
    //   // if (e.message.includes('LOCKED_OUT')) {
    //   //   setError('Your account has been locked');
    //   // } else {
    //   //   setError('Sign in failed!');
    //   // }
    //   setSubmitting(false);
    // });
  },
  mapPropsToValues,
  validationSchema,
});
