import Link from '../../elements/link';
import { NPMRepoData } from '../../types';
import scssObj from './_NPMRepoItem.scss';

interface Props {
  data: NPMRepoData;
}

const MatterListItem = ({ data }: Props) => {
  const { name, link, date } = data;

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__container`}>
        <div className={`${scssObj.baseClass}__item`}>
          <Link linkStyle="container" to={link} target="new" isNative>
            <div className={`${scssObj.baseClass}__details`}>
              {name}
              <br />
              {date}
              <br />
              {link}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatterListItem;
