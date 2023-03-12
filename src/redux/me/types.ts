import { ActionType } from 'typesafe-actions';
import { Config } from '../../types';
import {
  copyText,
  setGlobalConfig,
  setGlobalHeader,
  setIsClipboardVisible,
  clearClipboard,
  setIsContentStatic,
  completeSignIn,
  setGlobalAccess,
} from './actions';

export interface MeState {
  title: string;
  setting: Config;
  clipboard: {
    isVisible: boolean;
    hideItself: boolean;
  };
  isContentStatic: boolean;
  accessGranted: {
    devAccess: boolean;
    apiAccess: boolean;
  };
}

export type MeActions =
  | ActionType<typeof setGlobalHeader>
  | ActionType<typeof setGlobalConfig>
  | ActionType<typeof copyText>
  | ActionType<typeof setIsClipboardVisible>
  | ActionType<typeof clearClipboard>
  | ActionType<typeof setIsContentStatic>
  | ActionType<typeof completeSignIn>
  | ActionType<typeof setGlobalAccess>;
