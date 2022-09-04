import { NPMRepoData } from '../types';

type EntityFactory<T> = (base?: Partial<T>) => T;
type EntitiesFactory<T> = (count?: number, base?: Partial<T>) => T[];

export const createNPMRepoItem: EntityFactory<NPMRepoData> = (base?) => ({
  name: 'cbook',
  link: 'https://www.npmjs.com/package/cbook',
  date: '2022-03-13T09:21:35.838Z',
  version: '1.0.0',
  publisher: 'jyashu',
  ...base,
});

export const createNPMRepoList: EntitiesFactory<NPMRepoData> = (count = 3, base?) => {
  return Array(count)
    .fill(undefined)
    .map(() => createNPMRepoItem(base));
};
