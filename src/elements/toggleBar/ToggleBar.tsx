/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import scssObj from './_ToggleBar.scss';
import colors from '../../styles/variables/_colors.scss';

interface Props {
  options: { label: string | JSX.Element; value: any; id: string }[];
  value: any;
  setFieldValue: any;
  focusValues: number[];
  title?: string;
  className?: string;
  focusWidth?: string;
  focusHeight?: string;
  noFocusCondition?: boolean;
  focusColor?: string;
  renderFocus?: () => React.ReactNode;
}

const ToggleBar = ({
  options,
  value,
  className,
  noFocusCondition,
  setFieldValue,
  focusValues,
  title,
  focusWidth,
  focusHeight,
  focusColor,
  renderFocus,
}: Props) => {
  const [x, setX] = useState(() => {
    const index = options.map((option) => option.value).indexOf(value);
    return focusValues[index];
  });
  const [scaleX, setScaleX] = useState(1);
  const [currentValue, setCurrentValue] = useState(value);

  const moveFocus = (tx: number) => {
    setX(focusValues[tx]);
    setScaleX(0.7);
    setTimeout(() => setScaleX(0.9), 250);
  };

  useEffect(() => {
    if (value !== currentValue) {
      const index = options.map((option) => option.value).indexOf(value);
      moveFocus(index);
      setCurrentValue(value);
    }
  }, [value]);

  const cls = classNames(`${scssObj.baseClass}__focus`, {
    [`${scssObj.baseClass}__native`]: !renderFocus,
  });

  return (
    <div className={classNames(`${scssObj.baseClass}`, className)} title={title || ''}>
      <div
        className={cls}
        style={{
          opacity: `${noFocusCondition ? 0 : 1}`,
          left: x,
          transform: `scale(${scaleX})`,
          width: focusWidth || '80px',
          height: focusHeight || '40px',
          backgroundColor: renderFocus ? '' : focusColor || colors['nav-focus'],
        }}
      >
        {renderFocus && renderFocus()}
      </div>
      {options.map((option, index) => {
        return (
          <div
            className={`${scssObj.baseClass}__btn`}
            onClick={() => {
              setFieldValue(option.value);
            }}
            style={{
              width: focusWidth || '80px',
              height: focusHeight || '40px',
            }}
            key={option.id}
            role="none"
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default ToggleBar;
