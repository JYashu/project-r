import classNames from 'classnames';
import scssObj from './_Cat.scss';

/*
 * https://codepen.io/johanmouchet/pen/OXxvqr
 */

const Cat = () => {
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__cat`}>
        <div
          className={classNames(`${scssObj.baseClass}__ear`, `${scssObj.baseClass}__ear--left`)}
        />
        <div
          className={classNames(`${scssObj.baseClass}__ear`, `${scssObj.baseClass}__ear--right`)}
        />
        <div className={`${scssObj.baseClass}__face`}>
          <div
            className={classNames(`${scssObj.baseClass}__eye`, `${scssObj.baseClass}__eye--left`)}
          >
            <div
              className={classNames(
                `${scssObj.baseClass}__eye-pupil`,
                `${scssObj.baseClass}__eye-pupil--left`,
              )}
            />
          </div>
          <div
            className={classNames(`${scssObj.baseClass}__eye`, `${scssObj.baseClass}__eye--right`)}
          >
            <div
              className={classNames(
                `${scssObj.baseClass}__eye-pupil`,
                `${scssObj.baseClass}__eye-pupil--right`,
              )}
            />
          </div>
          <div className={`${scssObj.baseClass}__muzzle`} />
        </div>
      </div>
    </div>
  );
};

export default Cat;
