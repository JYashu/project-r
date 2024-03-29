export const FULLSTORY_EXCLUDE_CLASS = 'fs-exclude';

export const ACCESS_CODE = 'JYashu';

export const ACCESS_FIELD_TOKEN =
  'TAPETVM6H6KRDXCBFUE45CD36SEBUYLMHSAAG5YGMWN6GVX52RXWLPR5W4DPXSYM';

export const ACCESS_TOKEN = 'PL6MYW7MIZ34CPO5A6D5DUPMMSIX3XF3HUWLRIYAOQ4WAU2SFDBTJFBSWYBNLID3';

export const ELLIPSIS = '...';

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const BRAND_NAME = 'AY';

export const GAME_WON_MESSAGES = [
  { title: 'Well Done', message: 'How about another go?' },

  { title: 'Good Job', message: 'I bet you can not do that again?' },

  {
    title: 'Look at you',
    message: 'You think you can do it faster next time?',
  },
  { title: 'Way to go', message: 'That was lightening fast, Try again?' },
];

export enum Pages {
  HOME = '/',
  TODO = '/todo',
  TEST = '/test',
  MEMORY = '/memory',
  SNAKE = '/snake',
  TIC_TAC_TOE = '/tic-tac-toe',
  CBOOK = '/cbook',
  NPM_ENGINE = '/npm-engine',
  GIPHY_ENGINE = '/giphy-engine',
  SETTINGS = '/settings',
  IMG_CONVERTER = '/img-converter',
  SVG_CONVERTER = '/convert-to-png',
  SVG_CREATOR = '/convert-to-svg',
  MINE_SWEEPER = '/mine-sweeper',
  LOADING_SPINNERS = '/spinners',
  COLORS_PAGE = '/colors',
}

export const ASSIGNED_PATHS = [
  ...Object.values(Pages).map((page) => {
    if (page === Pages.CBOOK) {
      return '';
    }
    return page.toString();
  }),
  '/home',
  '/mal',
];

export const BETA_ONLY_PAGES = [Pages.TODO, Pages.TEST, Pages.NPM_ENGINE, Pages.GIPHY_ENGINE];

export const BETA_ONLY_PATHS = BETA_ONLY_PAGES.map((e) => e.toString());

export const HTML = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handleError(error);
        }
      }, false);
    </script>
  </body>
</html>
`;

export const PROXY_URLS = [
  'https://proxy.cors.sh/',
  'https://magnificent-brioche-204c18.netlify.app/',
  'https://angry-rose-coyote.cyclic.app/',
];

export const PageTitles = {
  [Pages.HOME]: 'Home',
  [Pages.TIC_TAC_TOE]: 'Tic Tac Toe',
  [Pages.MEMORY]: 'Memory Game',
  [Pages.SNAKE]: 'Snake',
  [Pages.MINE_SWEEPER]: 'MineSweeper',
  [Pages.GIPHY_ENGINE]: 'Giphy Engine',
  [Pages.NPM_ENGINE]: 'NPM Engine',
  [Pages.LOADING_SPINNERS]: 'Loading Spinners',
  [Pages.IMG_CONVERTER]: 'IMG Convertor',
  [Pages.SVG_CONVERTER]: 'SVG To PNG Convertor',
  [Pages.SVG_CREATOR]: 'IMG To SVG Convertor',
  [Pages.TEST]: 'Test Page',
  [Pages.TODO]: 'ToDo',
  [Pages.CBOOK]: 'CBook',
  [Pages.SETTINGS]: 'Settings',
  [Pages.COLORS_PAGE]: 'Colors',
};

export enum KeyCodes {
  TAB = 9,
  ENTER = 13,
  SHIFT = 16,
  CTRL = 17,
  ALT = 18,
  ESC = 27,
  SPACE = 32,
  ARROW_LEFT = 37,
  ARROW_UP = 38,
  ARROW_RIGHT = 39,
  ARROW_DOWN = 40,
  C = 67,
  D = 68,
  META_LEFT = 91,
  META_RIGHT = 93,
}
