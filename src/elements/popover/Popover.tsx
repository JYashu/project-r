import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import PopoverMui from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PopoverDefaultPosition } from './types';

import scssObj from './_Popover.scss';
import { KeyCodes } from '../../utils/consts';
import { getPopOutPosition } from '../../utils/getPopOutPosition';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
  }),
);
interface Props {
  children: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  contentId: string;
  defaultPosition: PopoverDefaultPosition;
  fixed?: boolean;
  popoverRole?: string;
  popoverLabel?: string;
  disabled?: boolean;
}

/* Expected component behavior:
- content is shown/hidden on mouse hover of trigger element
- content is shown on focus of trigger element
See https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html for accessibility guidelines. */

const Popover = ({
  children,
  className,
  content,
  contentId,
  defaultPosition,
  fixed,
  popoverRole,
  popoverLabel,
  disabled,
}: Props) => {
  const classes = useStyles();
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [contentPosition, setContentPosition] = useState({});
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const contentCls = classnames(`${scssObj.baseClass}__content`, {
    [`${scssObj.baseClass}__content--fixed`]: fixed,
    [`${scssObj.baseClass}__content--hidden`]: !isPopoverVisible,
  });

  const handleContentPositioning = () => {
    const position = getPopOutPosition(triggerRef, contentRef, defaultPosition, fixed);
    setContentPosition(position);
  };

  const handleShowPopover = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    if (disabled) return;
    handleContentPositioning();
    setIsPopoverVisible(true);
    setAnchorEl(event.currentTarget);
  };

  const handleHidePopover = () => {
    setIsPopoverVisible(false);
    setAnchorEl(null);
  };

  return (
    <div
      data-testid={Popover.name}
      className={classnames(scssObj.baseClass, className)}
      onMouseEnter={handleShowPopover}
      onMouseLeave={handleHidePopover}
      onClick={handleHidePopover}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      ref={triggerRef}
    >
      <div
        aria-describedby={contentId}
        className={`${scssObj.baseClass}__trigger`}
        onBlur={handleHidePopover}
        onFocus={handleShowPopover}
        role={popoverRole}
        tabIndex={0}
        aria-label={popoverLabel}
      >
        {children}

        <div
          aria-hidden={!isPopoverVisible}
          className={contentCls}
          id={contentId}
          ref={contentRef}
          role="tooltip"
          style={contentPosition}
          aria-label="popover-tooltip"
        >
          <PopoverMui
            id={contentId}
            className={className?.includes('linked-details') ? '' : classes.popover}
            open={isPopoverVisible}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: { width: '400px' },
            }}
            disableRestoreFocus
          >
            {content}
          </PopoverMui>
        </div>
      </div>
    </div>
  );
};

Popover.defaultProps = {
  defaultPosition: 'BOTTOM_RIGHT',
};

export default Popover;
