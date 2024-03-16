import { Snack } from '../../types';
import { addSnack, removeSnack } from './actions';

export interface SnackbarState {
  snacks: Snack[];
}

export type SnackbarActions = ReturnType<typeof addSnack> | ReturnType<typeof removeSnack>;
