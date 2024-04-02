import { ActiveNavigationItem } from '../../types';
import { BETA_ONLY_PAGES, Pages } from '../../utils/consts';

export interface Menu {
  isActive: boolean;
  icon: string;
  link?: string;
  isHiddenForProd?: boolean;
  title: string;
  newTarget?: boolean;
  onClick?: () => void;
}

export const getHiddenColumnItems = (activeNavigationItem: ActiveNavigationItem): Menu[] => {
  return [
    {
      isActive: activeNavigationItem === ActiveNavigationItem.NPMEngine,
      icon: 'search',
      link: '/npm-engine',
      isHiddenForProd: BETA_ONLY_PAGES.includes(Pages.NPM_ENGINE),
      title: `NPM Engine ${BETA_ONLY_PAGES.includes(Pages.NPM_ENGINE) ? '(Beta Only)' : ''}`,
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.GiphyEngine,
      icon: 'gif',
      link: '/giphy-engine',
      isHiddenForProd: BETA_ONLY_PAGES.includes(Pages.GIPHY_ENGINE),
      title: `Giphy Finder ${BETA_ONLY_PAGES.includes(Pages.GIPHY_ENGINE) ? '(Beta Only)' : ''}`,
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.Todo,
      icon: 'playlist_add_check',
      link: '/todo',
      isHiddenForProd: BETA_ONLY_PAGES.includes(Pages.TODO),
      title: `Todo ${BETA_ONLY_PAGES.includes(Pages.TODO) ? '(Beta Only)' : ''}`,
    },
  ];
};

export const getMenuColumnOneItems = (activeNavigationItem: ActiveNavigationItem): Menu[] => {
  return [
    {
      isActive: activeNavigationItem === ActiveNavigationItem.SpinnerPage,
      icon: 'restart_alt',
      link: '/spinners',
      isHiddenForProd: true,
      title: 'Spinners',
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.ColorsPage,
      icon: 'palette',
      link: '/colors',
      isHiddenForProd: true,
      title: 'Colors',
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.CBook,
      icon: 'developer_mode',
      link: '/cbook',
      title: 'CBook',
      newTarget: true,
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.IMGConverter,
      icon: 'style',
      link: '/img-converter',
      title: 'IMG Converter',
    },
  ];
};

export const getMenuColumnTwoItems = (activeNavigationItem: ActiveNavigationItem): Menu[] => {
  return [
    {
      isActive: activeNavigationItem === ActiveNavigationItem.TicTacToe,
      icon: 'align_vertical_center',
      link: '/tic-tac-toe',
      title: 'Tic Tac Toe',
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.Snake,
      icon: 'gesture',
      link: '/snake',
      title: 'Snake',
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.Memory,
      icon: 'memory',
      link: '/memory',
      title: 'Memory',
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.MineSweeper,
      icon: 'golf_course',
      link: '/mine-sweeper',
      title: 'MineSweeper',
    },
  ];
};

export const getMenuColumnThreeItems = (
  activeNavigationItem: ActiveNavigationItem,
  showClipboard: () => void,
  showDictionary: () => void,
): Menu[] => {
  return [
    {
      isActive: activeNavigationItem === ActiveNavigationItem.Test,
      icon: 'fact_check',
      link: '/test',
      title: `Test Page ${BETA_ONLY_PAGES.includes(Pages.TEST) ? '(Beta Only)' : ''}`,
      isHiddenForProd: BETA_ONLY_PAGES.includes(Pages.TEST),
    },
    {
      onClick: () => showClipboard(),
      isActive: activeNavigationItem === ActiveNavigationItem.Clipboard,
      icon: 'content_paste',
      title: 'Clipboard',
    },
    {
      onClick: () => showDictionary(),
      isActive: activeNavigationItem === ActiveNavigationItem.Dictionary,
      icon: 'book',
      title: 'Dictionary',
    },
    {
      isActive: activeNavigationItem === ActiveNavigationItem.Settings,
      icon: 'settings',
      link: '/settings',
      title: 'Settings',
    },
  ];
};
