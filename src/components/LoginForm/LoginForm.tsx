import React, { useEffect } from 'react';
import classnames from 'classnames';

import { Helmet } from 'react-helmet';
import scssObj from './_LoginForm.scss';
import { User } from '../../types';
import { Values } from './utils';
import { FULLSTORY_EXCLUDE_CLASS } from '../../utils/consts';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';

import Button from '../Button';
import Field from '../Field';
import LoadingSpinner from '../LoadingSpinner';
import Icon from '../Icon';

interface Props {
  error?: string;
  errors: ErrorValues<Values>;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isSubmitting?: boolean;
  email?: string | string[];
  touched: TouchedValues<Values>;
  user: User | null;
  values: Values;
}

const LoginForm = ({
  error,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  email,
  setFieldValue,
  touched,
  values,
}: Props) => {
  useEffect(() => {
    if (email) {
      setFieldValue('username', email);
    }
  }, [setFieldValue, email]);

  let signInErrorMsg: string = '';

  if (!values.username && !values.password) {
    signInErrorMsg = 'Username and Password are ';
  } else if (!values.username) {
    signInErrorMsg = 'Username is ';
  } else if (!values.password) {
    signInErrorMsg = 'Password is ';
  }

  if (values.username && errors.username) {
    signInErrorMsg = errors.username.concat(`. ${signInErrorMsg}`);
  }

  signInErrorMsg = signInErrorMsg.concat('required field. You are on ');
  return (
    <form aria-label="login-form" onSubmit={handleSubmit} className={`${scssObj.baseClass}__form`}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={`${scssObj.baseClass}__disclaimer`}>
        <span className={`${scssObj.baseClass}__disclaimer-mark`}>
          <Icon icon="warning" />
        </span>

        <div className={`${scssObj.baseClass}__disclaimer-text`}>
          This page is for demo purpose only. Enter any value in the fields and hit Sign in
        </div>
      </div>
      <p
        className={classnames(`${scssObj.baseClass}__form-error`, {
          [`${scssObj.baseClass}__display-none`]: !error,
        })}
      >
        {error}
      </p>
      <div aria-label="email as username is a required field">
        <Field
          name="username"
          label="Email"
          placeholder="Email"
          onChange={handleChange}
          value={values.username}
          className={classnames(`${scssObj.baseClass}__input`, FULLSTORY_EXCLUDE_CLASS)}
          touched={touched.username}
          errorClassName={`${scssObj.baseClass}__error`}
          errorMessage={errors.username}
        />
      </div>
      <div aria-label="password is a required field">
        <Field
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          value={values.password}
          errorClassName={`${scssObj.baseClass}__error`}
          errorMessage={errors.password}
          touched={touched.password}
          className={classnames(`${scssObj.baseClass}__input`, FULLSTORY_EXCLUDE_CLASS)}
        />
      </div>
      <Button
        className={`${scssObj.baseClass}__submit-button`}
        intent="primary"
        size="large"
        type="submit"
        disabled={isSubmitting}
      >
        {(!values.password || !values.username || errors.username) && (
          <div aria-label={signInErrorMsg} />
        )}
        {isSubmitting ? <LoadingSpinner size="small" /> : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;
