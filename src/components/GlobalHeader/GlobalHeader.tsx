import Hamburger from 'hamburger-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '../../elements/button';
import Clock from '../clock';
import scssObj from './_GlobalHeader.scss';
import { ASSIGNED_PATHS, BETA_ONLY_PATHS, Pages, PageTitles } from '../../utils/consts';
import Link from '../../elements/link';
import useGetEnvironment from '../../hooks/useGetEnvironment';

interface Props extends RouteComponentProps {
  title: Pages;
  isCollapsed: boolean;
  snakeScore: number;
  setGlobalTitle: (title: Pages) => unknown;
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
    const { isProd } = useGetEnvironment();

    if (history.location.pathname === '/') {
      setGlobalTitle(Pages.HOME);
    }

    if (!ASSIGNED_PATHS.includes(history.location.pathname)) return null;

    if (isProd && BETA_ONLY_PATHS.includes(history.location.pathname)) return null;

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
        <Link className={`${scssObj.baseClass}__title`} to={title.toString()}>
          {PageTitles[title]}
        </Link>
        {history.location.pathname === '/snake' && (
          <div className={`${scssObj.baseClass}__score`}>Score: {snakeScore}</div>
        )}
        <Link isExternal target="new" to="https://github.com/jyashu">
          <div className={`${scssObj.baseClass}__github`} />
        </Link>
        <div className={`${scssObj.baseClass}__clock`}>
          <Clock />
        </div>
      </div>
    );
  },
);

GlobalHeader.displayName = 'GlobalHeader';

export default GlobalHeader;
