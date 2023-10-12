import React from 'react';
import classnames from 'classnames';

import scssObj from './_DetailsPopover.scss';
import Icon from '../icon';
import Popover, { PopoverDefaultPosition } from '../popover';
import Tile from '../title';

export interface Props {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  contentId: string;
  defaultPosition?: PopoverDefaultPosition;
  fixed?: boolean;
  iconType: string;
  popoverRole?: string;
  popoverLabel?: string;
  disabled?: boolean;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'extra-extra-large';
}

const DetailsPopover = ({
  children,
  className,
  contentClassName,
  contentId,
  defaultPosition,
  fixed,
  iconType,
  popoverRole,
  popoverLabel,
  disabled,
  size,
}: Props) => (
  <Popover
    className={classnames(scssObj.baseClass, className)}
    content={
      <Tile className={classnames(`${scssObj.baseClass}__content-tile`, contentClassName)}>
        {children}
      </Tile>
    }
    contentId={contentId}
    defaultPosition={defaultPosition}
    fixed={fixed}
    popoverRole={popoverRole || 'button'}
    popoverLabel={popoverLabel || 'popover-button'}
    disabled={disabled}
  >
    <Icon className={`${scssObj.baseClass}__icon`} icon={iconType} size={size || 'small'} />
  </Popover>
);

export default DetailsPopover;
