import Hamburger from 'hamburger-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '../Button';
import Clock from '../Clock';
import scssObj from './_GlobalHeader.scss';
import { isMobileOrTablet } from '../../utils/getMobileOrTabletInfo';

interface Props extends RouteComponentProps {
  title: string;
  isCollapsed: boolean;
  snakeScore: number;
  setGlobalTitle: (title: string) => unknown;
  handleSideBarState: (isCollapsed: boolean) => void;
  handleStaticContent: (isStatic: boolean) => void;
}

const GlobalHeader = withRouter(
  ({
    history,
    title,
    isCollapsed,
    snakeScore,
    setGlobalTitle,
    handleSideBarState,
    handleStaticContent,
  }: Props) => {
    if (history.location.pathname === '/') {
      setGlobalTitle('Global Header');
    }

    if (
      history.location.pathname === '/auth' ||
      history.location.pathname === '/login' ||
      (history.location.pathname === '/login/' && !isMobileOrTablet)
    ) {
      return null;
    }
    const onClick = () => {
      handleSideBarState(!isCollapsed);
      if (isCollapsed) handleStaticContent(!isCollapsed);
      else setTimeout(() => handleStaticContent(!isCollapsed), 300);
    };

    return (
      <div role="banner" aria-label="header" className={scssObj.baseClass}>
        <div role="navigation" aria-label="sidebar-hamburger-menu">
          <Button
            className={`${scssObj.baseClass}__collapse`}
            onClick={onClick}
            rightIcon
            transparent
            ariaExpanded={!isCollapsed}
            ariaLabel="Sidebar Navigation"
          >
            <Hamburger
              size={20}
              toggled={!isCollapsed}
              toggle={() => handleSideBarState(!isCollapsed)}
            />
          </Button>
        </div>
        <div className={`${scssObj.baseClass}__title`}>{title}</div>
        {history.location.pathname === '/snake' && (
          <div className={`${scssObj.baseClass}__score`}>
            Score: {snakeScore}
          </div>
        )}

        <div className={`${scssObj.baseClass}__clock`}>
          <Clock />
        </div>
      </div>
    );
  }
);

GlobalHeader.displayName = 'GlobalHeader';

export default GlobalHeader;
