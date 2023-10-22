import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Button from '../../elements/button';
import scssObj from './_IMGConverter.scss';
import Dropdown from '../../elements/dropdown';
import Field from '../../elements/field';
import { Values } from './types';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import { ActiveSidebarItem } from '../../types';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { Pages } from '../../utils/consts';
import { FileType } from '../../elements/field/types';

const dropdownOptions = [
  {
    label: 'PNG',
    value: FileType.PNG,
  },
  {
    label: 'JPEG / JPG',
    value: FileType.JPEG,
  },
  {
    label: 'SVG',
    value: FileType.SVG,
  },
];

interface Props {
  values: Values;
  errors: ErrorValues<Values>;
  touched: TouchedValues<Values>;
  handleBlur: (e: React.FocusEvent) => void;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (field: string, value?: boolean, shouldValidate?: boolean) => void;
}

const IMGConverter = ({
  values,
  errors,
  touched,
  handleBlur,
  handleSubmit,
  setFieldValue,
}: Props) => {
  const [secondOptions, setSecondOptions] = useState(
    dropdownOptions.filter((i) => i.value !== FileType.JPEG),
  );

  useActiveSidebarItem(ActiveSidebarItem.IMGConverter);
  useSetGlobalHeader(Pages.IMG_CONVERTER);

  const history = useHistory();

  return (
    <div className={`${scssObj.baseClass}`}>
      <Helmet>
        <title>Image Converter</title>
        <meta name="title" content="Image Converter | JYashu" />
        <meta name="description" content="A simple tool to convert images to different formats." />
      </Helmet>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          if (values.fromField !== '' && values.toField === FileType.SVG) {
            history.push('/convert-to-svg');
          } else if (values.fromField !== '' && values.toField === FileType.PNG) {
            history.push('/convert-to-png');
          }
        }}
      >
        <div className={`${scssObj.baseClass}__convert`}>
          <span className={`${scssObj.baseClass}__from-text`}>Convert</span>
          <Field
            className={`${scssObj.baseClass}__from-field`}
            name="fromField"
            errorMessage={errors.fromField}
            touched={touched.fromField}
          >
            {(fieldName) => (
              <Dropdown
                name={fieldName}
                handleChange={(option) => {
                  setFieldValue(fieldName, option?.value || '');
                  if (option && option.value === 'svg') {
                    setSecondOptions(dropdownOptions.filter((i) => i.value === FileType.PNG));
                    if (values.toField === FileType.SVG) setFieldValue('toField', '');
                  } else {
                    setSecondOptions(dropdownOptions.filter((i) => i.value === FileType.SVG));
                    if (values.toField === FileType.PNG) setFieldValue('toField', '');
                  }
                }}
                handleBlur={handleBlur}
                placeholder="..."
                value={values.fromField}
                options={dropdownOptions}
              />
            )}
          </Field>
          <span className={`${scssObj.baseClass}__to-text`}>To</span>
          <Field
            className={`${scssObj.baseClass}__to-field`}
            name="toField"
            errorMessage={errors.toField}
            touched={touched.toField}
          >
            {(fieldName) => (
              <Dropdown
                name={fieldName}
                handleChange={(option) => {
                  setFieldValue(fieldName, option?.value || '');
                }}
                handleBlur={handleBlur}
                placeholder="..."
                value={values.toField}
                options={secondOptions}
              />
            )}
          </Field>
          <Button className={`${scssObj.baseClass}__submit`} type="submit">
            Convert
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IMGConverter;
