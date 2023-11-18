import * as React from 'react';
import classnames from 'classnames';

import scssObj from './_Tile.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
  role?: string;
  small?: boolean;
  flat?: boolean;
  onClick?: () => void;
}

/**
 * Tile component
 *
 * @param {Props} props
 *
 * @returns {React.ReactElement<'div'>}
 */
const Tile: React.FunctionComponent<Props> = ({
  children,
  className,
  role,
  small,
  flat,
  onClick,
}: Props): React.ReactElement<'div'> => {
  const tileCls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--small`]: small,
    [`${scssObj.baseClass}--flat`]: flat,
  });

  // Handle a more accessible tile if an onClick handler was passed.
  if (onClick) {
    return (
      <div
        role="button"
        aria-label="tile-button"
        tabIndex={0}
        onKeyPress={onClick}
        onClick={onClick}
        className={tileCls}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={tileCls} role={role}>
      {children}
    </div>
  );
};

export default Tile;
