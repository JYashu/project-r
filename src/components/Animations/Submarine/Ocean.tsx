import classNames from 'classnames';
import scssObj from './_Submarine.scss';
import Link from '../../../elements/link';

const Ocean = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={`${scssObj.baseClass}__seaContainer`}>
      {children} {/* we’ll inject submarine here */}
      <div className={`${scssObj.baseClass}__ground__container`}>
        <div
          className={classNames(`${scssObj.baseClass}__ground`, `${scssObj.baseClass}__ground1`)}
        >
          <span className={`${scssObj.baseClass}__up-1`} />
          <span className={`${scssObj.baseClass}__up-2`} />
          <span className={`${scssObj.baseClass}__up-3`} />
          <span className={`${scssObj.baseClass}__up-4`} />
          <span className={`${scssObj.baseClass}__up-5`} />
          <span className={`${scssObj.baseClass}__up-6`} />
          <span className={`${scssObj.baseClass}__up-7`} />
          <span className={`${scssObj.baseClass}__up-8`} />
          <span className={`${scssObj.baseClass}__up-9`} />
          <span className={`${scssObj.baseClass}__up-10`} />
        </div>
        <div
          className={classNames(`${scssObj.baseClass}__ground`, `${scssObj.baseClass}__ground2`)}
        >
          <span className={`${scssObj.baseClass}__up-1`} />
          <span className={`${scssObj.baseClass}__up-2`} />
          <span className={`${scssObj.baseClass}__up-3`} />
          <span className={`${scssObj.baseClass}__up-4`} />
          <span className={`${scssObj.baseClass}__up-5`} />
          <span className={`${scssObj.baseClass}__up-6`} />
          <span className={`${scssObj.baseClass}__up-7`} />
          <span className={`${scssObj.baseClass}__up-8`} />
          <span className={`${scssObj.baseClass}__up-9`} />
          <span className={`${scssObj.baseClass}__up-10`} />
          <span className={`${scssObj.baseClass}__up-11`} />
          <span className={`${scssObj.baseClass}__up-12`} />
          <span className={`${scssObj.baseClass}__up-13`} />
          <span className={`${scssObj.baseClass}__up-14`} />
          <span className={`${scssObj.baseClass}__up-15`} />
          <span className={`${scssObj.baseClass}__up-16`} />
          <span className={`${scssObj.baseClass}__up-17`} />
          <span className={`${scssObj.baseClass}__up-18`} />
          <span className={`${scssObj.baseClass}__up-19`} />
          <span className={`${scssObj.baseClass}__up-20`} />
        </div>
      </div>
      <div className={`${scssObj.baseClass}__credit`}>
        by{' '}
        <Link
          externalLinkIcon
          isExternal
          to="https://github.com/data-pirates07/submarine-animation-using-pure-css"
        >
          @data._.pirates
        </Link>
      </div>
    </div>
  );
};

export default Ocean;
