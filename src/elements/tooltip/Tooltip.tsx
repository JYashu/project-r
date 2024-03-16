import classNames from 'classnames';
import Icon from '../icon';
import scssObj from './_Tooltip.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Tooltip = ({ className, children }: Props) => {
  return (
    <div className={classNames(scssObj.baseClass, className)}>
      <Icon className={`${scssObj.baseClass}__icon`} icon="info" size="small" />
      <span className={`${scssObj.baseClass}__tooltip-text`}>{children}</span>
    </div>
  );
};

export default Tooltip;
