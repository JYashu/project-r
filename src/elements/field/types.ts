export enum FileType {
  SVG = 'image/svg+xml',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  IMAGE = 'image/*',
  JS = 'text/javascript',
  TXT = 'text/plain',
  TEXT = 'text/*',
  CBOOK = '.cbk',
}

export type FileObj = {
  file: File;
  type: string;
};
