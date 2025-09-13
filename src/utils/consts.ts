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

export enum GamePages {
  TIC_TAC_TOE = '/tic-tac-toe',
  MEMORY = '/memory',
  MINE_SWEEPER = '/mine-sweeper',
  SNAKE = '/snake',
}

export enum WebPages {
  HOME = '/',
  TODO = '/todo',
  TEST = '/test',
  CBOOK = '/cbook',
  NPM_ENGINE = '/npm-engine',
  GIPHY_ENGINE = '/giphy-engine',
  SETTINGS = '/settings',
  IMG_CONVERTER = '/img-converter',
  SVG_CONVERTER = '/convert-to-png',
  SVG_CREATOR = '/convert-to-svg',
  LOADING_SPINNERS = '/spinners',
  COLORS_PAGE = '/colors',
  GAMES = '/games',
}

export type PagesType = GamePages | WebPages;

export const Pages = { ...GamePages, ...WebPages };

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

export const getHTML = (cellId: string) => `
<html>
  <head>
    <style>
      html { background-color: white; }
    </style>
  </head>
  <body>
    <div id="root-cell-${cellId}"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root-cell-${cellId}');
        if (root) {
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        }
        console.error(error);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      // 👇 tell parent we're ready
      window.parent.postMessage({ type: 'ready', cellId: '${cellId}' }, '*');

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

export const GamePageTitles = {
  [Pages.TIC_TAC_TOE]: 'Tic Tac Toe',
  [Pages.MEMORY]: 'Memory Game',
  [Pages.SNAKE]: 'Snake',
  [Pages.MINE_SWEEPER]: 'MineSweeper',
};

export const PageTitles = {
  ...GamePageTitles,
  [Pages.HOME]: 'Home',
  [Pages.GIPHY_ENGINE]: 'Giphy Engine',
  [Pages.NPM_ENGINE]: 'NPM Engine',
  [Pages.LOADING_SPINNERS]: 'Spinners',
  [Pages.IMG_CONVERTER]: 'IMG Convertor',
  [Pages.SVG_CONVERTER]: 'SVG To PNG Convertor',
  [Pages.SVG_CREATOR]: 'IMG To SVG Convertor',
  [Pages.TEST]: 'Test Page',
  [Pages.TODO]: 'ToDo',
  [Pages.CBOOK]: 'CBook',
  [Pages.SETTINGS]: 'Settings',
  [Pages.COLORS_PAGE]: 'Colors',
  [Pages.GAMES]: 'Games',
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
  '0x79b-mfh9yie9-cdlc0qlq',
  'go7hv-lv2fwyca-xcb3h2ca',
];

export const CBOOK_DEMO_DATA: {
  [key: string]: Cell;
} = {
  'zwtci-lv2fwnc2-52i0fjoq': {
    content:
      "# 🚀 Demo Guide  \n\nWelcome! This quick guide will help you get the most out of the tool.\n### 📺 Displaying Output  \nUse the built-in **`show()`** function to render content in the preview panel.  \nFor example:  \n```js\nshow('Hello World');\n```\nThis will instantly display Hello World in the preview area.\n\n### ✨ Editor Actions\nThe code editor includes handy action buttons to streamline your workflow:\n1. Execute → Run the code currently in the editor.\n2. Format → Automatically tidy up your code for better readability.\n3. Copy → Copy the code to your clipboard for quick sharing or reuse.\n\n### 🔄 Code Execution\n* Code is bundled cumulatively, following the order of your cells.\n* This ensures that earlier definitions (like variables or functions) remain available in later cells.\n* You can write supporting code in one cell and use it seamlessly in another.\n\n### 📦 Organizing Cells\n* Use the toolbar on each cell to rearrange blocks (move them up or down).\n* This makes it simple to adjust the flow of your project as it evolves.\n* Combine code and markdown cells to create clean, well-structured projects.\n\n### 📝 Documenting with Markdown\nNot everything has to be code!\n* Use Markdown cells to add explanations, notes, and formatting.\n* Great for documentation, walkthroughs, or inline commentary alongside your code.\n* You can include headings, lists, code snippets, and links to make your notebook more readable.",
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
    content: "show('Hello World!');\nconst result = 2 + 3;",
    type: 'code',
    id: 'szqe4-lv2fx1t4-isj67l4m',
    showPreview: true,
  },
  '0x79b-mfh9yie9-cdlc0qlq': {
    // eslint-disable-next-line no-template-curly-in-string
    content: 'show(`Result of 2 + 3 is: ${result}`);',
    type: 'code',
    id: '0x79b-mfh9yie9-cdlc0qlq',
    showPreview: true,
  },
};
