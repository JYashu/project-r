import { GIFRepoActions, GIFRepoState } from './giphy';
import { MALActions, MALState } from './mal';
import { MeState, MeActions } from './me/types';
import { ModalActions, ModalState } from './modal';
import { NPMRepoActions, NPMRepoState } from './npm';
import { SidebarActions, SidebarState } from './sidebar';
import { SnackbarActions, SnackbarState } from './snackbar';
import { SnakeActions, SnakeState } from './snake';
import { TicTacToeActions, TicTacToeState } from './tictactoe';

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
  | MALActions;
