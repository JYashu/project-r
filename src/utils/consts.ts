import { Cell } from '../types';

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

export const CBOOK_DEMO_ORDER = [
  'zwtci-lv2fwnc2-52i0fjoq',
  'szqe4-lv2fx1t4-isj67l4m',
  'go7hv-lv2fwyca-xcb3h2ca',
];

export const CBOOK_DEMO_DATA: {
  [key: string]: Cell;
} = {
  'zwtci-lv2fwnc2-52i0fjoq': {
    content:
      "# Demo \nHere's a quick guide on how to use this tool effectively: \n* To display anything in the preview panel, simply utilize the built-in function show(). For instance, show('Hello World') will promptly showcase the text \"Hello World\" in the preview panel.\n* The code editor offers convenient action buttons for streamlined workflow:\n  1. Execute: Execute the code in the editor.\n  2. Format: Format the code for better readability.\n  3. Copy: Copy the code to your clipboard for easy sharing or storage.\n* The tool executes bundled code cumulatively, adhering to the order of the blocks. This ensures seamless execution and coherent results.\n* Effortlessly rearrange your code blocks using the toolbar provided on each cell. This feature allows you to move cells up or down, facilitating better organization and flow within your project.\n* Enhance the documentation of your code by using the markdown text editor. You can add detailed explanations, comments, and formatting to make your code more understandable.\n* Below is a demonstration code to illustrate the functionality of the tool. Feel free to modify and experiment with it!",
    type: 'md',
    id: 'zwtci-lv2fwnc2-52i0fjoq',
  },
  'go7hv-lv2fwyca-xcb3h2ca': {
    content:
      "import axios from 'axios';\nimport { useState, useEffect } from 'react';\nimport 'bulma/css/bulma.css';\n\nconst App = () => {\n  const [data, setData] = useState();\n  axios.get('https://jsonplaceholder.typicode.com/users').then(({ data }) => {\n    setData(data);\n  });\n\n  return (\n    <div>\n      {data ? (\n        <table>\n          <thead>\n            <tr><th>Name</th><th>Username</th><th>Website</th></tr>\n          </thead>\n          <tbody>\n            {data.map((row) => <tr><td>{row.name}</td><td>{row.username}</td><td>{row.website}</td></tr>)}\n          </tbody>\n        </table>\n      ) : (\n        <div>Loading...</div>\n      )}\n    </div>\n  );\n};\n\nshow(<App />);",
    type: 'code',
    id: 'go7hv-lv2fwyca-xcb3h2ca',
    showPreview: true,
  },
  'szqe4-lv2fx1t4-isj67l4m': {
    content:
      // eslint-disable-next-line no-template-curly-in-string
      "show('This is a demo code snippet.');\nconst result = 2 + 3;\nshow(`Result of 2 + 3 is: ${result}`);",
    type: 'code',
    id: 'szqe4-lv2fx1t4-isj67l4m',
    showPreview: true,
  },
};
