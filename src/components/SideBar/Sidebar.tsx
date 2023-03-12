import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ProSidebar, SidebarContent, Menu, MenuItem, SidebarFooter } from 'react-pro-sidebar';
import scssObj from './_Sidebar.scss';
import { ActiveSidebarItem, Config } from '../../types';
import Icon from '../../elements/icon';
import logOut from '../../utils/logOut';
import ENV from '../../utils/env';
import { ASSIGNED_PATHS, BETA_ONLY_PAGES, BETA_ONLY_PATHS, Pages } from '../../utils/consts';
import PermissionsManager from '../../elements/permissionsManager';
import useGetEnvironment from '../../hooks/useGetEnvironment';

interface Props extends RouteComponentProps {
  config: Config;
  isCollapsed: boolean;
  activeSidebarItem: ActiveSidebarItem;
  handleState: (isCollapsed: boolean) => void;
  showClipboard: () => void;
  openDictionary: () => void;
}

const Sidebar = withRouter(
  ({
    history,
    config,
    isCollapsed,
    activeSidebarItem,
    handleState,
    showClipboard,
    openDictionary,
  }: Props) => {
    const [isRecollapse, setRecollapse] = useState(true);
    const { isDev, isProd } = useGetEnvironment();

    if (
      history.location.pathname === '/auth' ||
      history.location.pathname === '/login' ||
      history.location.pathname === '/login/'
    ) {
      return null;
    }

    if (!ASSIGNED_PATHS.includes(history.location.pathname)) return null;

    if (isProd && BETA_ONLY_PATHS.includes(history.location.pathname)) return null;

    const itemClassName = `${scssObj.baseClass}__item`;

    return (
      <ProSidebar
        collapsed={isCollapsed}
        onMouseEnter={() => {
          if (isCollapsed) {
            handleState(false);
            setRecollapse(true);
          }
        }}
        onMouseLeave={() => {
          if (isRecollapse) {
            handleState(true);
            setRecollapse(false);
          }
        }}
      >
        <SidebarContent>
          <Menu key={uuidv4()} className={`${scssObj.baseClass}__footer_menu`} iconShape="square">
            <PermissionsManager isHiddenForProd={BETA_ONLY_PAGES.includes(Pages.GIPHY_ENGINE)}>
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.GiphyEngine}
                icon={<Icon removeOutline size="medium" icon="gif" />}
              >
                Giphy Finder {BETA_ONLY_PAGES.includes(Pages.GIPHY_ENGINE) ? '(Beta Only)' : ''}
                <Link tabIndex={-1} to="/giphy-engine" />
              </MenuItem>
            </PermissionsManager>
            <PermissionsManager isHiddenForProd={BETA_ONLY_PAGES.includes(Pages.NPM_ENGINE)}>
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.NPMEngine}
                icon={<Icon removeOutline size="small" icon="search" />}
              >
                NPM Engine {BETA_ONLY_PAGES.includes(Pages.NPM_ENGINE) ? '(Beta Only)' : ''}
                <Link tabIndex={-1} to="/npm-engine" />
              </MenuItem>
            </PermissionsManager>
            <PermissionsManager isHiddenForProd={BETA_ONLY_PAGES.includes(Pages.TODO)}>
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.Todo}
                icon={<Icon removeOutline size="small" icon="playlist_add_check" />}
              >
                Todo {BETA_ONLY_PAGES.includes(Pages.TODO) ? '(Beta Only)' : ''}
                <Link tabIndex={-1} to="/todo" />
              </MenuItem>
            </PermissionsManager>
            <MenuItem
              className={itemClassName}
              key={uuidv4()}
              active={activeSidebarItem === ActiveSidebarItem.SpinnerPage}
              icon={<Icon removeOutline size="small" icon="restart_alt" />}
            >
              Spinners
              <Link tabIndex={-1} to="/spinners" />
            </MenuItem>
            <MenuItem
              className={itemClassName}
              key={uuidv4()}
              active={activeSidebarItem === ActiveSidebarItem.CBook}
              icon={<Icon removeOutline size="small" icon="developer_mode" />}
            >
              CBook
              <Link tabIndex={-1} target="new" to="/cbook" />
            </MenuItem>
            <MenuItem
              className={itemClassName}
              key={uuidv4()}
              active={activeSidebarItem === ActiveSidebarItem.SVGConverter}
              icon={<Icon removeOutline size="small" icon="style" />}
            >
              SVG Converter
              <Link tabIndex={-1} to="/svg-converter" />
            </MenuItem>
          </Menu>
          <SidebarFooter className={`${scssObj.baseClass}__games`}>
            <Menu key={uuidv4()} className={`${scssObj.baseClass}__games-menu`} iconShape="square">
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.TicTacToe}
                icon={<Icon removeOutline size="small" icon="align_vertical_center" />}
              >
                Tic Tac Toe
                <Link tabIndex={-1} to="/tic-tac-toe" />
              </MenuItem>
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.Snake}
                icon={<Icon removeOutline size="small" icon="gesture" />}
              >
                Snake
                <Link tabIndex={-1} to="/snake" />
              </MenuItem>
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.Memory}
                icon={<Icon removeOutline size="small" icon="memory" />}
              >
                Memory
                <Link tabIndex={-1} to="/memory" />
              </MenuItem>
            </Menu>
          </SidebarFooter>
          <SidebarFooter className={`${scssObj.baseClass}__games`} />
        </SidebarContent>
        <SidebarFooter className={`${scssObj.baseClass}__footer`}>
          <Menu key={uuidv4()} className={`${scssObj.baseClass}__footer_menu`} iconShape="square">
            <PermissionsManager isHiddenForProd={BETA_ONLY_PAGES.includes(Pages.TEST)}>
              <MenuItem
                className={itemClassName}
                key={uuidv4()}
                active={activeSidebarItem === ActiveSidebarItem.Test}
                icon={<Icon removeOutline size="small" icon="fact_check" />}
              >
                Test Page {BETA_ONLY_PAGES.includes(Pages.TEST) ? '(Beta Only)' : ''}
                <Link tabIndex={-1} to="/test" />
              </MenuItem>
            </PermissionsManager>
            <MenuItem
              className={itemClassName}
              onClick={showClipboard}
              key={uuidv4()}
              active={activeSidebarItem === ActiveSidebarItem.Clipboard}
              icon={<Icon removeOutline size="small" icon="content_paste" />}
            >
              Clipboard
            </MenuItem>
            <MenuItem
              className={itemClassName}
              onClick={openDictionary}
              key={uuidv4()}
              active={activeSidebarItem === ActiveSidebarItem.Dictionary}
              icon={<Icon removeOutline size="small" icon="book" />}
            >
              Dictionary
            </MenuItem>
            <MenuItem
              className={itemClassName}
              key={uuidv4()}
              active={activeSidebarItem === ActiveSidebarItem.Settings}
              icon={<Icon removeOutline size="small" icon="settings" />}
            >
              Settings
              <Link tabIndex={-1} to="/settings" />
            </MenuItem>
            <PermissionsManager isHiddenForProd={BETA_ONLY_PAGES.includes(Pages.LOGIN)}>
              <MenuItem key={uuidv4()} icon={<Icon removeOutline size="small" icon="login" />}>
                Login {BETA_ONLY_PAGES.includes(Pages.LOGIN) ? '(Beta Only)' : ''}
                <Link tabIndex={-1} to="/login" />
              </MenuItem>
            </PermissionsManager>
            <PermissionsManager isLogout>
              <MenuItem
                key={uuidv4()}
                onClick={() => logOut()}
                icon={<Icon removeOutline size="small" icon="logout" />}
              >
                Logout
              </MenuItem>
            </PermissionsManager>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    );
  },
);

export default Sidebar;
