import CopyField from '../../elements/field/CopyField';
import Link from '../../elements/link';
import { NPMRepoData } from '../../types';
import { getDaysDifferenceBetweenTwoStringDates } from '../../utils/dateHelpers';
import scssObj from './_NPMRepoItem.scss';

interface Props {
  data: NPMRepoData;
}

const MatterListItem = ({ data }: Props) => {
  const { name, link, description, publisher, version, date } = data;

  const displayAge = () => {
    // const now = new Date();
    // const published = new Date(date);

    const diff = getDaysDifferenceBetweenTwoStringDates(date, 'now');

    if (diff < 30) return `${Math.floor(diff)} days`;
    if (diff < 365) return `${Math.floor(diff / 12)} months`;
    return `${Math.floor(diff / 365)} years`;
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__container`}>
        <div className={`${scssObj.baseClass}__item`}>
          <Link linkStyle="container" to={link} target="new" isNative>
            <div className={`${scssObj.baseClass}__details`}>
              <div className={`${scssObj.baseClass}__name`}>{name}</div>
              <div className={`${scssObj.baseClass}__info`}>
                {version} | {publisher} | Published {displayAge()} ago
              </div>
              {description && (
                <div className={`${scssObj.baseClass}__description`}>{description}</div>
              )}
            </div>
          </Link>
          <CopyField
            className={`${scssObj.baseClass}__install`}
            name="install"
            value={`npm i ${name}`}
          />
          {/* <div className={`${scssObj.baseClass}__install`}>npm i {name}</div> */}
        </div>
      </div>
    </div>
  );
};

export default MatterListItem;
