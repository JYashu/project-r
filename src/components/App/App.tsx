import QueryString from 'query-string';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Draggable from 'react-draggable';
import TodoPage from '../TodoPage';
import Sidebar from '../SideBar';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import scssObj from './_App.scss';
import GlobalHeader from '../GlobalHeader';
import TicTacToe from '../TicTacToe';
import NPMRepoEngine from '../NPMRepoEngine';
import TestPage from '../TestPage';
import Settings from '../Settings';
import { Config } from '../../types';
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

const App = ({
  config,
  isContentStatic,
  showClipboard,
}: {
  config: Config;
  isContentStatic: boolean;
  showClipboard: () => void;
}): React.ReactElement => {
  useKeyboardShortcut(['shift', 'ctrl'], () => showClipboard(), 'c');

  const cls = scssObj.baseClass;

  return (
    <div className={cls}>
      {/* <ScrollToTop /> */}
      {/* <PlatformMessage /> */}
      <ModalDialogController />

      <Snackbars />

      <Draggable>
        <Clipboard />
      </Draggable>

      {/* <HistoryListener /> */}
      <div className={`${cls}__global-header`} role="navigation" aria-label="global-header">
        <Route component={GlobalHeader} />
      </div>

      {!config.sidebar.rtl && (
        <div
          className={`${cls}__sidebar${isContentStatic ? '' : '-static'}`}
          role="navigation"
          aria-label="sidebar"
        >
          <PrivateRoute component={Sidebar} />
        </div>
      )}
      <Route
        path="/login"
        exact
        component={(props: RouteComponentProps) => {
          const { location, history } = props;
          const { accessToken } = getTokens();
          const { email } = QueryString.parse(location.search, {
            decode: false,
          });
          const isOnboardingFlow = () => {
            if (
              history.location.pathname.includes('login') ||
              history.location.pathname.includes('auth')
            ) {
              return true;
            }
            return false;
          };

          if (accessToken) {
            return <Redirect to="/home" />;
          }
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

      <div
        role="main"
        className={`${cls}__content${isContentStatic ? '-static' : ''}`}
        id="main-content"
        aria-label="main-content"
      >
        <Route path="/project-r" exact component={Home} />
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
      </div>

      {config.sidebar.rtl && (
        <div className={`${cls}__sidebar`} role="navigation" aria-label="sidebar">
          <PrivateRoute component={Sidebar} />
        </div>
      )}
    </div>
  );
};

export default hot(App);
