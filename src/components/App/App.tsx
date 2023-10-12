import QueryString from 'query-string';
import React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import TodoPage from '../todoPage';
import Sidebar from '../sideBar';
import scssObj from './_App.scss';
import GlobalHeader from '../globalHeader';
import TicTacToe from '../ticTacToe';
import NPMRepoEngine from '../npmRepoEngine';
import TestPage from '../testPage';
import Settings from '../settings';
import GiphySearchEngine from '../giphySearchEngine';
import ModalDialogController from '../modalDialogController';
import SpinnerPage from '../spinnerPage';
import Snackbars from '../snackbars';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import Clipboard from '../clipboard';
import Snake from '../snake';
import MALEngine from '../malEngine';
import LoginPage from '../loginPage';
import { getTokens } from '../../utils/requestTokens';
import HandleLoginContainer from '../handleLogin/HandleLoginContainer';
import Home from '../home/Home';
import Memory from '../memory';
import Dictionary from '../dictionary';
import NotFound from '../notFound';
import ENV from '../../utils/env';
import CBook from '../cbook';
import SVGConverter from '../svgConverter';
import useGetEnvironment from '../../hooks/useGetEnvironment';
import MineSweeper from '../mineSweeper';
import { KeyCodes } from '../../utils/consts';

interface Props {
  isDictionaryVisible: boolean;
  isContentStatic: boolean;
  showClipboard: () => void;
  openDictionary: () => void;
}

const App = ({
  isDictionaryVisible,
  isContentStatic,
  showClipboard,
  openDictionary,
}: Props): React.ReactElement => {
  useKeyboardShortcut(() => showClipboard(), KeyCodes.C, [KeyCodes.SHIFT, KeyCodes.CTRL]);
  useKeyboardShortcut(() => openDictionary(), KeyCodes.D, [KeyCodes.SHIFT, KeyCodes.CTRL]);

  const cls = scssObj.baseClass;

  const { isDev } = useGetEnvironment();

  window.speechSynthesis.getVoices();

  return (
    <div className={cls}>
      {/* <ScrollToTop /> */}
      {/* <PlatformMessage /> */}
      <ModalDialogController />
      <Snackbars />
      <div className={`${scssObj.baseClass}__container`}>
        <Clipboard />

        {isDictionaryVisible && <Dictionary />}
      </div>

      {/* <HistoryListener /> */}
      <div className={`${cls}__global-header`} role="navigation" aria-label="global-header">
        <Route component={GlobalHeader} />
      </div>

      <div
        className={`${cls}__sidebar${isContentStatic ? '' : '-static'}`}
        role="navigation"
        aria-label="sidebar"
      >
        <Route component={Sidebar} />
      </div>

      <div
        role="main"
        className={`${cls}__content${isContentStatic ? '-static' : ''}`}
        id="main-content"
        aria-label="main-content"
      >
        <Switch>
          <Route path="/cbook" exact component={CBook} />

          <Route
            path="/login"
            exact
            component={(props: RouteComponentProps) => {
              const { location } = props;
              const { accessToken } = getTokens();
              const { email } = QueryString.parse(location.search, {
                decode: false,
              });

              if (email) {
                return <LoginPage email={decodeURIComponent(email)} />;
              }

              return <LoginPage />;
            }}
          />
          <Route
            path="/auth"
            exact
            component={(props: RouteComponentProps) => {
              const { location } = props;
              const { accessToken } = getTokens();
              const searchParams = new URLSearchParams(location.search);
              const authCode = searchParams.get('code');

              if (!accessToken && !authCode) {
                window.location.href = '/';
              }

              return <HandleLoginContainer />;
            }}
          />
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/todo" exact component={TodoPage} />
          <Route path="/tic-tac-toe" exact component={TicTacToe} />
          <Route path="/npm-engine" exact component={NPMRepoEngine} />
          <Route path="/test" exact component={TestPage} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/giphy-engine" exact component={GiphySearchEngine} />
          <Route path="/spinners" exact component={SpinnerPage} />
          <Route path="/snake" exact component={() => <Snake height={600} width={1000} />} />
          <Route path="/memory" exact component={Memory} />
          <Route path="/mal" exact component={MALEngine} />
          <Route path="/svg-converter" exact component={SVGConverter} />
          <Route path="/mine-sweeper" exact component={MineSweeper} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default hot(App);
