import { ASSETS_BASE_URL } from '../../../utils/assets';
import scssObj from './_Astronaut.scss';

export default () => {
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__stars`}>
        <div className={`${scssObj.baseClass}__objects`}>
          <img
            className={`${scssObj.baseClass}__object_rocket`}
            src={`${ASSETS_BASE_URL}/404/rocket.svg`}
            width="40px"
            alt="rocket"
          />
          <div className={`${scssObj.baseClass}__earth-moon`}>
            <img
              className={`${scssObj.baseClass}__object_earth`}
              src={`${ASSETS_BASE_URL}/404/earth.svg`}
              width="100px"
              alt="earth"
            />
            <img
              className={`${scssObj.baseClass}__object_moon`}
              src={`${ASSETS_BASE_URL}/404/moon.svg`}
              width="80px"
              alt="moon"
            />
          </div>
          <div className={`${scssObj.baseClass}__object_jupiter`}>
            <img
              className={`${scssObj.baseClass}__object_earth`}
              src={`${ASSETS_BASE_URL}/404/mars.webp`}
              width="100px"
              alt="mars"
            />
          </div>
          <div className={`${scssObj.baseClass}__box_astronaut`}>
            <img
              className={`${scssObj.baseClass}__object_astronaut`}
              src={`${ASSETS_BASE_URL}/404/astronaut.png`}
              width="140px"
              alt="astronaut"
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
