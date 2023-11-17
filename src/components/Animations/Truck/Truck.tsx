import Icon from '../../../elements/icon';
import Link from '../../../elements/link';
import scssObj from './_Truck.scss';

/*
 * CSS animations by Chris Johnson: https://codepen.io/ChrisJohnson/pen/OyXWpr
 */

const Truck = () => {
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__loop-wrapper`}>
        <div className={`${scssObj.baseClass}__tree`} />
        <div className={`${scssObj.baseClass}__tree`} />
        <div className={`${scssObj.baseClass}__tree`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__mountain`} />
        <div className={`${scssObj.baseClass}__hill`} />
        <div className={`${scssObj.baseClass}__rock`} />
        <div className={`${scssObj.baseClass}__truck`} />
        <div className={`${scssObj.baseClass}__wheels`} />
      </div>
      <div className={`${scssObj.baseClass}__credit`}>
        by{' '}
        <Link externalLinkIcon isExternal to="https://codepen.io/ChrisJohnson/pen/OyXWpr">
          Chris Johnson
        </Link>
      </div>
    </div>
  );
};

export default Truck;
