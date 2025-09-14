import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import { css } from '@emotion/css';

import { FULLSTORY_EXCLUDE_CLASS } from '../../utils/consts';
import Icon from '../icon';

import scssObj from './_Dropdown.scss';
import colors from '../../styles/variables/_colors.scss';
import FieldError from '../fieldError';

export interface Option {
  label: string;
  value: string | null;
  meta?: any;
  fsExclude?: boolean;
  isFixed?: boolean;
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
  isTransparent?: boolean;
  noBorder?: boolean;
  dropdownStyle?: 'button';
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

    const result = optionsMemo.find((option) => option.value === value);
    resultMemo = result || null;
  }

  return resultMemo;
};

const defaultProps = {
  actions: [],
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
  const [scrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    if (actionsRef.current) {
      const { width, height } = (actionsRef.current as any).getBoundingClientRect();
      setDimensions((prev) => ({ ...prev, actions: { width, height } }));
    } else {
      setDimensions((prev) => ({ ...prev, actions: undefined }));
    }
  }, [actionsRef, children]);

  useEffect(() => {
    if (optionsRef.current) {
      const { width, height } = (optionsRef.current as any).getBoundingClientRect();
      setDimensions((prev) => ({ ...prev, options: { width, height } }));
    } else {
      setDimensions((prev) => ({ ...prev, options: undefined }));
    }
  }, [optionsRef, children]);

  const { innerProps, selectProps } = props;
  const { options, actions } = (Array.isArray(children) ? children : [children]).reduce(
    (acc: MenuListAcc, next: React.ReactElement) => {
      if (next.props.data && next.props.data.handleAction) {
        acc.actions.push(
          <div className={`${scssObj.baseClass}__menu-list-item`} key={next.key}>
            {next}
          </div>,
        );
      } else if (next.props.data && next.props.data.isFixed) {
        acc.actions.push(
          <div className={`${scssObj.baseClass}__menu-list-item`} key={next.key}>
            {next}
          </div>,
        );
      } else {
        acc.options.push(
          <div className={`${scssObj.baseClass}__menu-list-item`} key={next.key}>
            {next}
          </div>,
        );
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

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setScrollEnd(true);
    } else if (scrollEnd) {
      setScrollEnd(false);
    }
  };

  const styles = getStyles('menuList', props);
  const style = {} as React.CSSProperties;
  style.marginBottom = dimensions.actions ? dimensions.actions.height + 4 : 0;
  style.paddingBottom = dimensions.actions ? 0 : 4;
  style.maxHeight =
    dimensions.options && options.length
      ? (dimensions.options.height / options.length) * selectProps.pageSize + 4
      : undefined;

  const isScrollable =
    (Boolean(displayActions.length) && options.length > 3) ||
    (!displayActions.length && options.length > 4);

  return (
    <>
      <div
        ref={innerRef}
        className={classnames(cx('', css(styles)), menuListClass)}
        {...innerProps}
        style={style}
        onScroll={handleScroll}
      >
        <div ref={optionsRef}>{options}</div>
      </div>

      {isScrollable && !scrollEnd && (
        <div
          className={`${scssObj.baseClass}__scrollable-icon-div`}
          style={{
            position: 'absolute',
            right: '0',
            top: `${actions.length > 0 ? '60%' : '88%'}`,
          }}
        >
          <Icon
            className={`${scssObj.baseClass}__scrollable-icon`}
            icon="keyboard_double_arrow_down"
            size="small"
            removeOutline
          />
        </div>
      )}

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
  placeholder,
  value,
  noBorder,
  errorMessage,
  isTransparent,
  dropdownStyle,
}: Props) => {
  const optionBackgroundColor = (state: { isSelected: boolean; isFocused: boolean }) => {
    if (state.isFocused) {
      return colors.seacrest;
    }
    if (state.isSelected) {
      return colors['lily-white'];
    }
    return '#fff';
  };

  const hasError = !!errorMessage;

  const errorCls = classnames(`${scssObj.baseClass}__error`);

  const customSelectStyles = {
    control: (base: React.CSSProperties, state: { isFocused: boolean }) => ({
      ...base,
      height: '100%',
      minHeight: null,
      paddingTop: hasLabel && value ? 12 : 0,
      backgroundColor: isTransparent ? 'transparent' : colors['lily-white'],
      boxShadow: 'none',
      borderColor: noBorder ? `transparent !important` : `${colors['nav-bg']} !important`,
    }),
    menu: (base: React.CSSProperties) => ({
      ...base,
      backgroundColor: 'transparent',
      marginTop: 0,
    }),
    option: (base: React.CSSProperties, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...base,
      backgroundColor: 'transparent',
      color: colors.eden,
    }),
    singleValue: (base: React.CSSProperties) => ({
      ...base,
      marginLeft: 0,
    }),
    placeholder: (base: React.CSSProperties, state: { isDisabled: boolean }) => ({
      ...base,
      color: state.isDisabled ? colors['light-grey'] : colors.chimera,
    }),
    clearIndicator: (base: React.CSSProperties) => ({
      ...base,
      color: colors.chimera,
    }),
  };

  const fixedActions = options.reduce((count, option) => {
    if ('isFixed' in option) return count + 1;
    return count;
  }, actions.length);

  const pageSize = fixedActions > 0 ? 3 : 4;

  return (
    <>
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

      {hasError && <FieldError className={errorCls}>{errorMessage}</FieldError>}
    </>
  );
};

Dropdown.defaultProps = defaultProps;

export default Dropdown;
