import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Icon from '../../elements/icon';
import PermissionsManager from '../../elements/permissionsManager';
import { ActiveNavigationItem } from '../../types';
import scssObj from './_Navigation.scss';
import {
  Menu,
  getHiddenColumnItems,
  getMenuColumnOneItems,
  getMenuColumnThreeItems,
  getMenuColumnTwoItems,
} from './consts';
import Link from '../../elements/link';

interface Props {
  isNavigationOpen: boolean;
  activeNavigationItem: ActiveNavigationItem;
  showClipboard: () => void;
  showDictionary: () => void;
  collapseNavigation: () => void;
}

interface MenuItemProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  link?: string;
  isHiddenForProd?: boolean;
  title: string;
  onClick?: () => void;
  collapseNavigation: () => void;
}

const MenuItem = ({
  children,
  icon,
  isActive,
  link,
  isHiddenForProd,
  title,
  onClick,
  collapseNavigation,
}: MenuItemProps) => {
  const clickHandler = () => {
    if (onClick) {
      onClick();
      collapseNavigation();
    } else if (link) {
      collapseNavigation();
    } else console.error('Click function not configured!');
  };

  const item = (
    <div
      tabIndex={-1}
      role="button"
      className={classNames(`${scssObj.baseClass}__item`, {
        [`${scssObj.baseClass}__item--is-active`]: isActive,
      })}
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
      {icon && <div className={`${scssObj.baseClass}__icon`}>{icon}</div>}
      <div className={`${scssObj.baseClass}__child`}>{title}</div>
      {children && children}
    </div>
  );

  return (
    <PermissionsManager isHiddenForProd={isHiddenForProd || false}>
      {link ? <Link to={link}>{item}</Link> : item}
    </PermissionsManager>
  );
};

const MenuList = ({
  menuList,
  collapseNavigation,
}: {
  menuList: Menu[];
  collapseNavigation: () => void;
}) => {
  return (
    <div className={`${scssObj.baseClass}__column`}>
      {[...menuList].map(({ link, icon, isActive, isHiddenForProd, title, onClick }) => {
        return (
          <MenuItem
            title={title}
            link={link}
            onClick={onClick}
            icon={<Icon removeOutline size="small" icon={icon} />}
            isActive={isActive}
            isHiddenForProd={isHiddenForProd || false}
            collapseNavigation={collapseNavigation}
          />
        );
      })}
    </div>
  );
};

const Navigation = ({
  isNavigationOpen,
  activeNavigationItem,
  showClipboard,
  showDictionary,
  collapseNavigation,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (isNavigationOpen) setLoaded(true);
  }, [isNavigationOpen]);

  return (
    <div
      className={classNames(scssObj.baseClass, {
        [`${scssObj.baseClass}--is-open`]: isNavigationOpen,
        [`${scssObj.baseClass}--is-collapsed`]: loaded && !isNavigationOpen,
      })}
    >
      <PermissionsManager isHiddenForProd>
        <MenuList
          menuList={getHiddenColumnItems(activeNavigationItem)}
          collapseNavigation={collapseNavigation}
        />
      </PermissionsManager>
      <MenuList
        menuList={getMenuColumnOneItems(activeNavigationItem)}
        collapseNavigation={collapseNavigation}
      />
      <MenuList
        menuList={getMenuColumnTwoItems(activeNavigationItem)}
        collapseNavigation={collapseNavigation}
      />
      <MenuList
        menuList={getMenuColumnThreeItems(activeNavigationItem, showClipboard, showDictionary)}
        collapseNavigation={collapseNavigation}
      />
    </div>
  );
};

export default Navigation;
