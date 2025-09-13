import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Button from '../../elements/button';
import scssObj from './_IMGConverter.scss';
import Dropdown from '../../elements/dropdown';
import Field, { FileField } from '../../elements/field';
import { Values } from './types';
import { ErrorValues, TouchedValues } from '../../utils/typeHelpers';
import useSetActiveSidebarItem from '../../hooks/useSetActiveNavigationItem';
import { ActiveNavigationItem } from '../../types';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { Pages } from '../../utils/consts';
import { FileObj, FileType } from '../../elements/field/types';
import useGetUniqueId from '../../hooks/useGetUniqueId';

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
  const [fieldId, setFieldId] = useState(useGetUniqueId());
  const [secondOptions, setSecondOptions] = useState(
    dropdownOptions.filter((i) => i.value !== FileType.JPEG),
  );

  useSetActiveSidebarItem(ActiveNavigationItem.IMGConverter);
  useSetGlobalHeader(Pages.IMG_CONVERTER);

  const navigate = useNavigate();

  const onFileUpload = (fileObj: FileObj | undefined) => {
    if (fileObj && fileObj.file) {
      setFieldId({ id: '' });
      if (fileObj.type === FileType.SVG) {
        navigate(`/convert-to-png?id=${fieldId.id}`);
      } else {
        navigate(`/convert-to-svg?id=${fieldId.id}`);
      }
    }
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <Helmet>
        <title>Image Converter</title>
        <meta name="title" content="Image Converter | JYashu" />
        <meta name="description" content="A simple tool to convert images to different formats." />
      </Helmet>
      <form
        className={`${scssObj.baseClass}__form`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          if (values.fromField !== '' && values.toField === FileType.SVG) {
            navigate('/convert-to-svg');
          } else if (values.fromField !== '' && values.toField === FileType.PNG) {
            navigate('/convert-to-png');
          }
        }}
      >
        <div className={`${scssObj.baseClass}__title`}>
          <h2>Image Converter</h2>
        </div>
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
                  if (option && option.value === FileType.SVG) {
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
          <Button className={`${scssObj.baseClass}__submit`} buttonStyle="skew" type="submit">
            Convert
          </Button>
        </div>
      </form>
      <div className={`${scssObj.baseClass}__file-field-wrapper`}>
        <FileField
          className={`${scssObj.baseClass}__file-field`}
          fieldId={fieldId.id}
          persistData
          minimal
          renderButton={() => (
            <Button icon="cloud_upload" buttonStyle="skew">
              Select File
            </Button>
          )}
          onFileUpload={onFileUpload}
          acceptedTypes={[FileType.IMAGE]}
        />
      </div>
    </div>
  );
};

export default IMGConverter;
