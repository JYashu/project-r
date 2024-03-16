/* eslint-disable jsx-a11y/alt-text */
import { withRouter } from 'react-router-dom';
import scssObj from './_NotFound.scss';
import Astronaut from '../animations/astronaut';
import { ASSETS_BASE_URL } from '../../utils/assets';
import Button from '../../elements/button';
import Link from '../../elements/link';

const NotFound = withRouter((history) => {
  const state = (history.location.state || { from: undefined }) as { from?: string };

  return (
    <div className={scssObj.baseClass}>
      {/* <div className={`${scssObj.baseClass}__bg`}> */}
      <Astronaut />
      {/* </div> */}
      <div className={`${scssObj.baseClass}__content`}>
        <img src={`${ASSETS_BASE_URL}/404.png`} width="300px" />
        <div className={`${scssObj.baseClass}__msg`}>
          <div className={`${scssObj.baseClass}__title`}>Grats!</div>
          <div className={`${scssObj.baseClass}__sub`}>You&apos;ve successfully gotten lost</div>
          <div className={`${scssObj.baseClass}__sub`}>just like this astronaut</div>

          <Link to={state.from || '/home'}>
            <Button buttonStyle="blur">Go back{!state.from && ' Home'}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default NotFound;
