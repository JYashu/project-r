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

export const STATES = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
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

export const ASSIGNED_PATHS = [
  '/',
  '/home',
  'todo',
  '/tic-tac-toe',
  '/npm-engine',
  '/test',
  '/settings',
  '/giphy-engine',
  '/spinners',
  '/snake',
  '/memory',
  '/mal',
  '/svg-converter',
];

export enum Pages {
  TODO = 'todo',
  TEST = 'test',
  MEMORY = 'memory',
  SNAKE = 'snake',
  TIC_TAC_TOE = 'tic-tac-toe',
  CBOOK = 'cbook',
  NPM_ENGINE = 'npm-engine',
  GIPHY_ENGINE = 'giphy-engine',
  SETTINGS = 'settings',
  LOGIN = 'login',
  SVGConverter = 'svg-converter',
}

export const BETA_ONLY_PAGES = [
  Pages.TODO,
  Pages.TEST,
  Pages.LOGIN,
  Pages.NPM_ENGINE,
  Pages.GIPHY_ENGINE,
];

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
