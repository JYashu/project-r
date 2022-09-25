/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import { ASSETS_BASE_URL } from '../../../utils/assets';
import scssObj from './_Astronaut.scss';

export default () => {
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__stars`}>
        {/* <div className={`${scssObj.baseClass}__central-body`}>
          <img
            className={`${scssObj.baseClass}__image-404`}
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
          />
        </div> */}
        <div className={`${scssObj.baseClass}__objects`}>
          <img
            className={`${scssObj.baseClass}__object_rocket`}
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
          <div className={`${scssObj.baseClass}__earth-moon`}>
            <img
              className={`${scssObj.baseClass}__object_earth`}
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
            />
            <img
              className={`${scssObj.baseClass}__object_moon`}
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
            />
          </div>
          <div className={`${scssObj.baseClass}__object_jupiter`}>
            <img
              className={`${scssObj.baseClass}__object_earth`}
              src="https://3tjgvb3tdd7aelfox3lofer7-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/is-there-life-on-mars-600x600.png"
              width="100px"
            />
          </div>
          <div className={`${scssObj.baseClass}__box_astronaut`}>
            <img
              className={`${scssObj.baseClass}__object_astronaut`}
              src="https://www.pinclipart.com/picdir/big/523-5232959_astronaut-clip-art.png"
              width="140px"
            />
          </div>
        </div>
        <div className={`${scssObj.baseClass}__glowing_stars`}>
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
          <div className={`${scssObj.baseClass}__star`} />
        </div>
      </div>
    </div>
  );
};
