import Draggable from 'react-draggable';
import { Helmet } from 'react-helmet';
import colors from '../../styles/variables/_colors.scss';
import { getUniqueId } from '../../utils/helpers';
import scssObj from './_ColorPage.scss';
import useSetActiveSidebarItem from '../../hooks/useSetActiveNavigationItem';
import { ActiveNavigationItem } from '../../types';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { Pages } from '../../utils/consts';

const ColorsPage = () => {
  useSetActiveSidebarItem(ActiveNavigationItem.ColorsPage);
  useSetGlobalHeader(Pages.COLORS_PAGE);
  const colorsKeys = Object.keys(colors);
  return (
    <div className={scssObj.baseClass}>
      <Helmet>
        <title>Colors</title>
      </Helmet>
      {colorsKeys.map((color) => (
        <Draggable>
          <div
            className={`${scssObj.baseClass}__color-box`}
            style={{ backgroundColor: `${colors[color]}` }}
            title={color}
            key={getUniqueId()}
          >
            {color}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default ColorsPage;
