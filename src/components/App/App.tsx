import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
        <Routes>
          <Route path="*" element={<GlobalHeader />} />
        </Routes>
      </div>

      <Navigation />

      <div role="main" className={`${cls}__content`} id="main-content" aria-label="main-content">
        <Routes>
          <Route path="/cbook" element={<CBook />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/npm-engine" element={<NPMRepoEngine />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/giphy-engine" element={<GiphySearchEngine />} />
          <Route path="/spinners" element={<SpinnerPage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/memory" element={<Memory />} />
          {/* <Route path="/mal" element={<MALEngine />} /> */}
          <Route path="/img-converter" element={<IMGConverter />} />
          <Route path="/convert-to-svg" element={<SVGCreator />} />
          <Route path="/convert-to-png" element={<SVGConverter />} />
          <Route path="/mine-sweeper" element={<MineSweeper />} />
          <Route path="/games" element={<Games />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
