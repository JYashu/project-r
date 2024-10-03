import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import TodoPage from '../todoPage';
import scssObj from './_App.scss';
import GlobalHeader from '../globalHeader';
import TicTacToe from '../ticTacToe';
import NPMRepoEngine from '../npmRepoEngine';
import TestPage from '../testPage';
import Settings from '../settings';
import GiphySearchEngine from '../giphySearchEngine';
import SpinnerPage from '../spinnerPage';
import Snackbar from '../snackbar';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import Clipboard from '../clipboard';
import Snake from '../snake';
import MALEngine from '../malEngine';
import Home from '../home/Home';
import Memory from '../memory';
import Dictionary from '../dictionary';
import NotFound from '../notFound';
import CBook from '../cbook';
import SVGConverter from '../svgConverter';
import MineSweeper from '../mineSweeper';
import { KeyCodes } from '../../utils/consts';
import SVGCreator from '../svgCreator';
import IMGConverter from '../imgConverter';
import ColorsPage from '../colorPage/ColorPage';
import ModalManager from '../modalManager';
import Navigation from '../navigation';
import Games from '../games';

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

  window.speechSynthesis.getVoices();

  return (
    <div className={cls}>
      <ModalManager />
      <Snackbar />
      <div className={`${scssObj.baseClass}__container`}>
        <Clipboard />

        {isDictionaryVisible && <Dictionary />}
      </div>

      <div className={`${cls}__global-header`} role="navigation" aria-label="global-header">
        <Route component={GlobalHeader} />
      </div>

      <Navigation />

      <div role="main" className={`${cls}__content`} id="main-content" aria-label="main-content">
        <Switch>
          <Route path="/cbook" exact component={CBook} />
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/todo" exact component={TodoPage} />
          <Route path="/tic-tac-toe" exact component={TicTacToe} />
          <Route path="/npm-engine" exact component={NPMRepoEngine} />
          <Route path="/test" exact component={TestPage} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/giphy-engine" exact component={GiphySearchEngine} />
          <Route path="/spinners" exact component={SpinnerPage} />
          <Route path="/colors" exact component={ColorsPage} />
          <Route path="/snake" exact component={Snake} />
          <Route path="/memory" exact component={Memory} />
          <Route path="/mal" exact component={MALEngine} />
          <Route path="/img-converter" exact component={IMGConverter} />
          <Route path="/convert-to-svg" exact component={SVGCreator} />
          <Route path="/convert-to-png" exact component={SVGConverter} />
          <Route path="/mine-sweeper" exact component={MineSweeper} />
          <Route path="/games" exact component={Games} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default hot(App);
