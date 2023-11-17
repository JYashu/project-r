import classnames from 'classnames';

import scssObj from './_Icon.scss';

interface Props {
  className?: string;
  description?: string;
  icon: any;
  title?: string;
  onClickHandler?: () => void;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'extra-extra-large';
  removeOutline?: boolean | undefined;
}

/**
 * Icon component.
 *
 * @param {Props}
 */
const Icon = ({
  className,
  icon,
  title,
  onClickHandler,
  size,
  description,
  removeOutline,
}: Props) => {
  const cls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--size-${size}`]: size,
  });

  const iconCls = classnames('material-icons', { 'material-icons-outlined': !removeOutline });

  return (
    <div className={cls}>
      <i aria-hidden="true" className={iconCls} onClick={onClickHandler} title={title || ''}>
        {icon}

        <span className={`${scssObj.baseClass}__description`}>{description}</span>
      </i>
    </div>
  );
};

export default Icon;
