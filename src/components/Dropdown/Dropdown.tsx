import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import { css } from '@emotion/css';

import { FULLSTORY_EXCLUDE_CLASS } from '../../utils/consts';
import Icon from '../Icon';

import scssObj from './_Dropdown.scss';
import colors from '../../styles/variables/_colors.scss';

export interface Option {
  label: string;
  value: string | null;
  meta?: any;
  fsExclude?: boolean;
}

interface FixedAction {
  label: string;
  handleAction: (...args: any[]) => void;
  render?: () => React.ReactNode;
  fsExclude?: boolean;
}

interface Props {
  actions: FixedAction[];
  handleChange: (value: Option | null) => void;
  name: string;
  options: Option[];
  pageSize: number;
  noOptionsMessage?: string;
  openMenuOnClick?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  menuPortalTarget?: HTMLElement | null;
  hasError?: boolean;
  placeholder?: string;
  value?: Option['value'];
  hasLabel?: boolean;
  className?: string;
  errorMessage?: string;
  handleBlur?: (e: React.FocusEvent) => void;
}

interface MenuListAcc {
  actions: React.ReactNode[];
  options: React.ReactNode[];
}

interface Dimensions {
  actions: { width: number; height: number } | undefined;
  options: { width: number; height: number } | undefined;
}

let optionsMemo: Option[];
let valueMemo: Option['value'] | undefined;
let resultMemo: Option | null;
const findOption = (options: Option[], value?: Option['value']) => {
  if (!value) {
    return null;
  }

  if (options !== optionsMemo || value !== valueMemo) {
    optionsMemo = options;
    valueMemo = value;

    const result = optionsMemo.find(option => option.value === value);
    resultMemo = result || null;
  }

  return resultMemo;
};

const defaultProps = {
  actions: [],
  pageSize: 4,
};

const menuListClass = `${scssObj.baseClass}__menu-list`;
const actionsClass = `${scssObj.baseClass}__menu-list-actions`;

/**
 * Custom DropdownMenuList
 */
const DropdownMenuList = ({ cx, children, getStyles, innerRef, ...props }: any) => {
  const optionsRef = useRef(null);
  const actionsRef = useRef(null);
  const [displayActions, setDisplayActions] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [dimensions, setDimensions] = useState<Dimensions>({
    actions: undefined,
    options: undefined,
  });

  useEffect(() => {
    if (actionsRef.current) {
      const { width, height } = (actionsRef.current as any).getBoundingClientRect();
      setDimensions(prev => ({ ...prev, actions: { width, height } }));
    } else {
      setDimensions(prev => ({ ...prev, actions: undefined }));
    }
  }, [actionsRef, children]);

  useEffect(() => {
    if (optionsRef.current) {
      const { width, height } = (optionsRef.current as any).getBoundingClientRect();
      setDimensions(prev => ({ ...prev, options: { width, height } }));
    } else {
      setDimensions(prev => ({ ...prev, options: undefined }));
    }
  }, [optionsRef, children]);

  const { innerProps, selectProps } = props;
  const { options, actions } = (Array.isArray(children) ? children : [children]).reduce(
    (acc: MenuListAcc, next: React.ReactElement) => {
      if (next.props.data && next.props.data.handleAction) {
        acc.actions.push(<div className={`${scssObj.baseClass}__menu-list-item`}>{next}</div>);
      } else {
        acc.options.push(<div className={`${scssObj.baseClass}__menu-list-item`}>{next}</div>);
      }

      return acc;
    },
    {
      options: [],
      actions: [],
    },
  );

  if (firstRender) {
    setDisplayActions(actions);
    setFirstRender(false);
  }

  const styles = getStyles('menuList', props);
  const style = {} as React.CSSProperties;
  style.marginBottom = dimensions.actions ? dimensions.actions.height + 4 : 0;
  style.paddingBottom = dimensions.actions ? 0 : 4;
  style.maxHeight =
    dimensions.options && options.length
      ? (dimensions.options.height / options.length) * selectProps.pageSize + 4
      : undefined;

  return (
    <>
      <div
        ref={innerRef}
        className={classnames(cx('', css(styles)), menuListClass)}
        {...innerProps}
        style={style}
      >
        <div ref={optionsRef}>{options}</div>
      </div>

      {Boolean(displayActions.length) && (
        <div
          className={classnames(actionsClass, {
            [`${actionsClass}--solo`]: !options.length,
          })}
          ref={actionsRef}
        >
          {displayActions}
        </div>
      )}
    </>
  );
};

/**
 * Decorated react-select component
 */
const Dropdown = ({
  actions,
  className,
  handleBlur,
  handleChange,
  hasLabel,
  isClearable,
  isDisabled,
  menuPortalTarget,
  name,
  noOptionsMessage,
  openMenuOnClick,
  options,
  pageSize,
  placeholder,
  value,
}: Props) => {
  const optionBackgroundColor = (state: { isSelected: boolean; isFocused: boolean }) => {
    if (state.isFocused) {
      return colors.associate;
    }
    if (state.isSelected) {
      return colors['juror-5'];
    }
    return '#fff';
  };

  const customSelectStyles = {
    control: (base: React.CSSProperties, state: { isFocused: boolean }) => ({
      ...base,
      height: '100%',
      minHeight: null,
      paddingTop: hasLabel && value ? 12 : 0,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      borderColor: state.isFocused ? `${colors.lawyer} !important` : `transparent !important`,
    }),
    menu: (base: React.CSSProperties) => ({
      ...base,
      backgroundColor: 'transparent',
      marginTop: 0,
    }),
    option: (base: React.CSSProperties, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...base,
      backgroundColor: 'transparent',
      color: colors['juror-1'],
    }),
    singleValue: (base: React.CSSProperties) => ({
      ...base,
      marginLeft: 0,
    }),
    placeholder: (base: React.CSSProperties, state: { isDisabled: boolean }) => ({
      ...base,
      color: state.isDisabled ? colors['juror-3'] : colors.prosecutor,
    }),
    clearIndicator: (base: React.CSSProperties) => ({
      ...base,
      color: colors.prosecutor,
    }),
  };

  return (
    <Select
      className={classnames(scssObj.baseClass, className)}
      components={{
        DropdownIndicator: () => <Icon icon="arrow_drop_down" />,
        IndicatorSeparator: () => null,
        MenuList: DropdownMenuList,
      }}
      formatOptionLabel={(option: Option | FixedAction) => {
        return 'render' in option && option.render ? (
          option.render()
        ) : (
          <div
            className={classnames({
              [`${FULLSTORY_EXCLUDE_CLASS}`]: option.fsExclude,
            })}
          >
            {option.label}
          </div>
        );
      }}
      inputId={name}
      isClearable={isClearable}
      isDisabled={isDisabled}
      menuPortalTarget={menuPortalTarget}
      menuPosition={menuPortalTarget ? 'fixed' : undefined}
      menuShouldScrollIntoView
      name={name}
      noOptionsMessage={noOptionsMessage ? () => noOptionsMessage : undefined}
      onBlur={handleBlur}
      onChange={(option: Option | FixedAction | null) => {
        if (!option) {
          handleChange(null);
          return;
        }

        if ('handleAction' in option) {
          option.handleAction();
        } else {
          handleChange(option);
        }
      }}
      openMenuOnClick={openMenuOnClick}
      options={[...options, ...actions]}
      pageSize={pageSize}
      placeholder={placeholder}
      styles={customSelectStyles}
      value={findOption(options, value)}
    />
  );
};

Dropdown.defaultProps = defaultProps;

export default Dropdown;
