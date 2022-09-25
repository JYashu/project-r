export interface MetaCallback<RequestPayload = any, SuccessPayload = any, FailurePayload = any> {
  requestPayload?: RequestPayload;
  onSuccess?: (payload: SuccessPayload) => void;
  onFailure?: (payload: FailurePayload) => void;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface NPMRepoData {
  name: string;
  link: string;
  date: string;
  publisher: string;
  version: string;
}

export interface NPMResponse {
  objects: [];
  time: string;
  total: number;
}

export interface GiphyResponse {
  data: [];
  meta: {};
  pagination: { total_count: number; count: number; offset: number };
}

export type Intent = 'cancel' | 'destructive' | 'primary' | 'none';

export enum ActiveSidebarItem {
  None,
  Todo,
  TicTacToe,
  NPMEngine,
  Test,
  Settings,
  GiphyEngine,
  SpinnerPage,
  Snake,
  MAL,
  Clipboard,
  Memory,
  Dictionary,
}

export interface Config {
  clock: {
    format12h: boolean;
  };
}

export enum SpinnerType {
  PulseLoader,
  BarLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClockLoader,
  GridLoader,
  HashLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
  MorphLoader,
  DotsBarSpinner,
  CubeFlipSpinner,
  BoxLoadingSpinner,
}

export enum SnackType {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  DEFAULT = 'SUCCESS',
}

export enum Img {
  Wave = 'wave',
  WaveSmall = 'waveSmall',
  WaveLarge = 'waveLarge',
}

export interface Snack {
  duration?: number;
  id: string;
  message: string;
  snackType: SnackType;
  img?: Img;
  undo?: {
    accountId: string;
    transactionId: string;
    prevAllocation?: { amount: number; matterId: string; notes: string | null };
    unlink?: boolean;
  };
}

export enum SuggestionOperationType {
  CONFIRM,
  DENY,
  UNLINK,
}

export enum SuggestionType {
  OUTSTANDING_CHECK,
  PAYMENT_REQUEST,
}

export enum AIMode {
  Easy = 'Easy',
  Moderate = 'Moderate',
  Hard = 'Hard',
}

export interface User extends Omit<{ email: string }, 'providerOrganization'> {}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Meaning {
  antonyms: string[];
  synonyms: string[];
  definitions: { definition: string; example: string[] }[];
  partOfSpeech: string;
}

export interface Definition {
  word: string;
  phonetics: { text: string; audio: string };
  meanings: Meaning[];
}
