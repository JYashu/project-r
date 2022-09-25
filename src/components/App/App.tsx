import QueryString from 'query-string';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import TodoPage from '../TodoPage';
import Sidebar from '../SideBar';
import scssObj from './_App.scss';
import GlobalHeader from '../GlobalHeader';
import TicTacToe from '../TicTacToe';
import NPMRepoEngine from '../NPMRepoEngine';
import TestPage from '../TestPage';
import Settings from '../Settings';
import GiphySearchEngine from '../GiphySearchEngine';
import ModalDialogController from '../ModalDialogController';
import SpinnerPage from '../SpinnerPage';
import Snackbars from '../Snackbars';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import Clipboard from '../Clipboard';
import Snake from '../Snake';
import MALEngine from '../MALEngine';
import LoginPage from '../LoginPage';
import { getTokens } from '../../utils/requestTokens';
import HandleLoginContainer from '../HandleLogin/HandleLoginContainer';
import Home from '../Home/Home';
import Memory from '../Memory';
import Dictionary from '../Dictionary';
import NotFound from '../NotFound';
import ENV from '../../utils/env';
import CBook from '../CBook';

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
  useKeyboardShortcut(['shift', 'ctrl'], () => showClipboard(), 'c');
  useKeyboardShortcut(['shift', 'ctrl'], () => openDictionary(), 'd');

  const cls = scssObj.baseClass;

  const isDev = ENV.isDevelopment;

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
          {isDev && <Route path="/test" exact component={TestPage} />}
          <Route path="/settings" exact component={Settings} />
          <Route path="/giphy-engine" exact component={GiphySearchEngine} />
          <Route path="/spinners" exact component={SpinnerPage} />
          <Route path="/snake" exact component={() => <Snake height={600} width={1000} />} />
          <Route path="/memory" exact component={Memory} />
          {isDev && <Route path="/mal" exact component={MALEngine} />}
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default hot(App);
