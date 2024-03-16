import { FormikErrors, FormikTouched } from 'formik';

export type ErrorValues<T> = FormikErrors<T>;

export type TouchedValues<T> = FormikTouched<T>;
