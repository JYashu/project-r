import Submarine from '../Submarine/Submarine';
import scssObj from './_Home.scss';

const Home = () => {
  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__wrapper`}>
        <div className={`${scssObj.baseClass}__image-cont`}>
          <div className={`${scssObj.baseClass}__image`} />
        </div>

        <div className={`${scssObj.baseClass}__sub-cont`}>
          <Submarine animate />
        </div>
      </div>
    </div>
  );
};

export default Home;
