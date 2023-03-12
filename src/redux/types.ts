import { DictionaryActions, DictionaryState } from './dictionary/types';
import { GIFRepoActions, GIFRepoState } from './giphy/types';
import { MALActions, MALState } from './mal/types';
import { MeState, MeActions } from './me/types';
import { ModalActions, ModalState } from './modal/types';
import { NPMRepoActions, NPMRepoState } from './npm/types';
import { SidebarActions, SidebarState } from './sidebar/types';
import { SnackbarActions, SnackbarState } from './snackbar/types';
import { SnakeActions, SnakeState } from './snake/types';
import { TicTacToeActions, TicTacToeState } from './tictactoe/types';
import { CBookActions, CBookState } from './cbook/types';
import { FileReaderActions, FileReaderState } from './fileReader/types';

export interface State {
  me: MeState;
  tictactoe: TicTacToeState;
  npmRepo: NPMRepoState;
  sidebar: SidebarState;
  gifRepo: GIFRepoState;
  modal: ModalState;
  snackbar: SnackbarState;
  snake: SnakeState;
  mal: MALState;
  dictionary: DictionaryState;
  cbook: CBookState;
  fileReader: FileReaderState;
}

export type Actions =
  | MeActions
  | TicTacToeActions
  | NPMRepoActions
  | SidebarActions
  | GIFRepoActions
  | ModalActions
  | SnackbarActions
  | SnakeActions
  | MALActions
  | DictionaryActions
  | CBookActions
  | FileReaderActions;
