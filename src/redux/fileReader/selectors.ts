import { State } from '../types';

export const selectFileReaderState = (state: State) => state.fileReader;

export const selectFilesById = (state: State) => selectFileReaderState(state).filesById;

export const selectFileDataById = (state: State, { id }: { id: string }) =>
  selectFilesById(state)[id];

export const selectIds = (state: State) => selectFileReaderState(state).ids;
