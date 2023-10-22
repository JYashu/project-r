import { combineReducers } from 'redux';

import { State } from './types';
import meReducer from './me/reducer';
import tictactoeReducer from './tictactoe/reducer';
import npmRepoReducer from './npm/reducer';
import sidebarReducer from './sidebar/reducer';
import gifRepoReducer from './giphy/reducer';
import modalReducer from './modal/reducer';
import snackbarReducer from './snackbar/reducer';
import snakeReducer from './snake/reducer';
import malReducer from './mal/reducer';
import dictionaryReducer from './dictionary/reducer';
import cbookReducer from './cbook/reducer';
import fileReaderReducer from './fileReader/reducer';
import converterReducer from './converter/reducer';

export default combineReducers<State>({
  me: meReducer,
  tictactoe: tictactoeReducer,
  npmRepo: npmRepoReducer,
  sidebar: sidebarReducer,
  gifRepo: gifRepoReducer,
  modal: modalReducer,
  snackbar: snackbarReducer,
  snake: snakeReducer,
  mal: malReducer,
  dictionary: dictionaryReducer,
  cbook: cbookReducer,
  fileReader: fileReaderReducer,
  converter: converterReducer,
});
