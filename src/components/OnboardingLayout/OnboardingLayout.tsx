import React from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import scssObj from './_OnboardingLayout.scss';
import images from '../../utils/images';
import { Img } from '../../types';

interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
  description?: React.ReactNode;
  header?: React.ReactNode;
  hideFooter?: boolean;
  hideLogo?: boolean;
  image?: Img;
}

const OnboardingLayout = ({
  children,
  className,
  title,
  description,
  header,
  hideFooter,
  hideLogo,
  image,
}: Props) => {
  const history = useHistory();
  let isOnboarding = false;
  if (history.location.pathname.includes('login')) {
    isOnboarding = true;
  }

  const displayTitle = title;
  const img = 'http://placeimg.com/525/849/animals';

  const marketingImage = (
    <>
      <img src={img} height="830px" alt="pricing" />
    </>
  );

  return (
    <div className={classnames(scssObj.baseClass, className)}>
      <div className={`${scssObj.baseClass}__row`}>
        <div className={`${scssObj.baseClass}__left-column`}>
          {marketingImage && (
            <div className={`${scssObj.baseClass}__marketing-image`}>{marketingImage}</div>
          )}
        </div>
        <div className={`${scssObj.baseClass}__center-column`}>
          <div className={`${scssObj.baseClass}__content-row`}>
            <div className={`${scssObj.baseClass}__logo-row`}>
              {!hideLogo && <div className={`${scssObj.baseClass}__logo`}>Logo</div>}
            </div>

            <div className={`${scssObj.baseClass}__title`}>
              <h1>{displayTitle}</h1>
              <div className={`${scssObj.baseClass}__img`}>{image && images.get(image)}</div>
              <div className={`${scssObj.baseClass}__description`}>{description}</div>
            </div>
            <div className={`${scssObj.baseClass}__content`}>{children}</div>
          </div>
        </div>
        <div className={`${scssObj.baseClass}__right-column`}>
          <div className={`${scssObj.baseClass}__header-row`}>{header}</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
