import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { getHexCodeFromColorString } from '../../utils/helpers';
import Field from './Field';
import scssObj from './_Field.scss';

interface Props {
  minimal?: boolean;
  className?: string;
  placeHolder?: string;
  errorMessage?: string;
  defaultColor?: string;
  disabled?: boolean;
  title?: string;
  onChange?: (color: string) => void;
}

const ColorField = ({
  minimal,
  className,
  placeHolder,
  errorMessage,
  defaultColor,
  disabled,
  title,
  onChange,
}: Props) => {
  const [error, setError] = useState('');
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>(defaultColor || '#000000');
  const [displayColor, setDisplayColor] = useState<string>();

  const handleColorChange = (e: any) => {
    setError('');
    setColor(e.target.value);
    setDisplayColor(e.target.value);
  };

  useEffect(() => {
    if (onChange) onChange(color || '#000000');
  }, [color, onChange]);

  const handleColorInput = (e: any) => {
    const { value } = e.target as { value: string };
    setDisplayColor(value);

    const hex = getHexCodeFromColorString(value);

    if (!value) {
      setError('');
      setColor('#000000');
    } else if (hex) {
      setError('');
      setColor(hex);
    } else {
      setError(errorMessage || 'Enter color in RGB or HEX or HSL format');
    }
  };

  return (
    <div className={classNames(`${scssObj.baseClass}__color-field`, className)}>
      {minimal ? (
        <div
          className={`${scssObj.baseClass}__picker-wrapper`}
          onClick={() => colorInputRef?.current?.click()}
          title={title || displayColor || 'Pick Color'}
          role="none"
        >
          <div className={`${scssObj.baseClass}__picker`} style={{ backgroundColor: color }} />
        </div>
      ) : (
        <Field
          className={`${scssObj.baseClass}__color-input`}
          name="colorPicker"
          hasButton
          renderButton={() => (
            <div
              className={`${scssObj.baseClass}__picker-wrapper`}
              onClick={() => colorInputRef?.current?.click()}
              title="Pick Color"
              role="none"
            >
              <div className={`${scssObj.baseClass}__picker`} style={{ backgroundColor: color }} />
            </div>
          )}
          placeholder={placeHolder || 'Enter color'}
          icon=""
          iconPosition="LEFT"
          onChange={handleColorInput}
          value={displayColor}
          touched
          errorMessage={error}
          disabled={disabled}
          title={title}
        />
      )}

      <input
        type="color"
        className={`${scssObj.baseClass}__input-button`}
        ref={colorInputRef}
        id="colorPicker"
        onChange={handleColorChange}
        value={color}
        disabled={disabled}
      />
    </div>
  );
};

export default ColorField;
