import scssObj from './_Truck.scss';

/*
 * https://codepen.io/ChrisJohnson/pen/OyXWpr
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
    </div>
  );
};

export default Truck;
