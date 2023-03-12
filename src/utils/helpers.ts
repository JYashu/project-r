import {
  HEX_REGEX,
  HSL_REGEX,
  RGB_REGEX,
  RGB_VALUES_SEPARATOR_REGEX,
  SHORT_HEX_REGEX,
} from './regex';

const parsedNumberCache = new Map();

/**
 * Parses a number from numerical string
 * @param {string} number Numerical string to be parsed
 * @returns {number | undefined} - Number or undefined depending on given string
 *
 * @example '234.56' => 234.56
 * @example '234h4' => undefined
 */
export const parseNumber = (number: string): number | undefined => {
  if (parsedNumberCache.has(number)) return parsedNumberCache.get(number);
  const result = Number.isNaN(parseFloat(number)) ? undefined : parseFloat(number);
  parsedNumberCache.set(number, result);
  return result;
};

/**
 * Generates a 19 characters long unique identifier separated into 3 parts by hyphens (-).
 *
 *  * First part is a 5 character string generated from a random string using Math.random() and toString(36).
 *  * Second part is a 4 character string generated from current timestamp string using Date.now() and toString(36).
 *  * Third part is an 8 character string generated from a random string using Math.random() and toString(36).
 *
 * @param {Array.string} ids An optional array of ids to ensure that the new ID is truly unique
 * @returns {string} A string representing a unique identifier.
 *
 * @example by5vv-tqrj-vf1w0zog
 */
export const getUniqueId = (ids?: string[]): string => {
  const id = `${Math.random().toString(36).substring(2, 7)}-${Date.now()
    .toString(36)
    .substring(2, 6)}-${Math.random().toString(36).substring(2, 10)}`;
  if (ids?.includes(id)) return getUniqueId(ids);
  return id;
};

/**
 * Download files from url to the user's machine
 *
 * The function first creates an a element and sets its display style to none,
 * so it's not visible on the page. Then it sets the href property of the
 * link to the URL of the Blob, and sets the download property to the desired file name.
 *
 * Next, the function adds the link to the body of the page, clicks it to initiate
 * the download, and removes the link from the page.
 * Finally, it revokes the object URL to free up memory.
 *
 * @param {string} url url of the file to be downloaded
 * @param {string} name name of the file to be downloaded
 */
export const downloadFile = (url: string, name: string) => {
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.style.display = 'none';
  link.href = url;
  link.download = name;
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Reads the file as an ArrayBuffer, which is then converted to a Uint8Array,
 * which is a typed array of 8-bit unsigned integers.
 * The first four elements of this array are then compared to the
 * expected starting bytes for each file type,
 * as defined by their respective file format specifications.
 *
 * @param {File | Blob} file
 * @returns {Promise<{ type: string; extension: string }}
 */
const readFile = async (file: File | Blob): Promise<{ type: string; extension: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    let fileType = '';
    let ext = '';
    reader.onload = (event) => {
      const arrayBuffer = event?.target?.result;
      const byteArray = new Uint8Array(arrayBuffer as ArrayBuffer);
      const header = byteArray.slice(0, 4);

      if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47) {
        fileType = 'image/png';
        ext = 'png;';
      }
      if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
        fileType = 'image/jpeg';
        ext = 'jpg';
      }
      if (header[0] === 0x3c && header[1] === 0x73 && header[2] === 0x76 && header[3] === 0x67) {
        fileType = 'image/svg+xml';
        ext = 'svg';
      }
      if (header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46) {
        fileType = 'application/pdf';
        ext = 'pdf';
      }
      if (header[0] === 0x49 && header[1] === 0x44 && header[2] === 0x33) {
        fileType = 'audio/mpeg';
        ext = 'mp3';
      }
      if (header[0] === 0x00 && header[1] === 0x00 && header[2] === 0x00 && header[3] === 0x20) {
        fileType = 'video/mp4';
        ext = 'mp4';
      }
      if (header[0] === 0x00 && header[1] === 0x00 && header[2] === 0x00 && header[3] === 0x14) {
        fileType = 'video/quicktime';
        ext = 'mov';
      }
      // console.log('File type could not be determined');
      // header.map((b) => console.log(`0x${b.toString(16)}`));
      resolve({ type: fileType, extension: ext });
    };
    reader.onerror = reject;
  });
};

/**
 * Scans the file name to determine its type by reading its extension.
 *
 * If extension is not available in the file name then the function
 * reads the file as an ArrayBuffer, which is then converted to a Uint8Array,
 * which is a typed array of 8-bit unsigned integers.
 * The first four elements of this array are then compared to the
 * expected starting bytes for each file type,
 * as defined by their respective file format specifications.
 *
 * @param {File | Blob} file File to be scanned for type determination
 * @param {File | Blob} fileExtension Optional file extension can be given if extension is already known
 * @returns {Promise<{ type: string; extension: string }>} A promise which returns file type and extension as result
 *
 * @example { type: 'application/pdf'; extension: 'pdf'}
 */
export const getFileType = async (
  file: File | Blob,
  fileExtension?: string,
): Promise<{ type: string; extension: string }> => {
  let extension: string | undefined;
  if ('name' in file) {
    const nameArray: string[] = file.name.split('.');
    extension = nameArray.length > 0 ? nameArray.pop() : undefined;
  } else {
    extension = fileExtension;
  }

  if (extension) {
    switch (extension) {
      case 'mov':
        return { type: 'video/quicktime', extension };
        break;
      case 'svg':
        return { type: 'image/svg+xml', extension };
        break;
      case 'png':
        return { type: 'image/png', extension };
        break;
      case 'jpg':
      case 'jpeg':
        return { type: 'image/jpeg', extension };
        break;
      case 'pdf':
        return { type: 'application/pdf', extension };
        break;
      case 'mp3':
        return { type: 'audio/mpeg', extension };
        break;
      case 'mp4':
        return { type: 'video/mp4', extension };
        break;
      default:
        break;
    }
  }

  const result = await readFile(file);
  return result;
};

/**
 * Reads the contents of a file as a text string using the FileReader API.
 *
 * @param {File | Blob} file - The file or Blob object to be read.
 * @returns {Promise<string>} - A Promise that resolves with the contents of the file as a text string.
 */
export const getFileAsText = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

export const hslToHex = (h: string, s: string, l: string) => {
  const hue = (parseNumber(h) || 0) / 360;
  const saturation = (parseNumber(s) || 0) / 100;
  const lightness = (parseNumber(l) || 0) / 100;
  let r: number;
  let g: number;
  let b: number;
  if (saturation === 0) {
    r = lightness;
    g = lightness;
    b = lightness;
  } else {
    const hue2rgb = (p: number, q: number, _t: number) => {
      let t = _t;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q =
      lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    r = hue2rgb(p, q, hue + 1 / 3);
    g = hue2rgb(p, q, hue);
    b = hue2rgb(p, q, hue - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 *
 * @param {string} color
 * @returns {string | undefined}
 */
export const getHexCodeFromColorString = (color: string): string | undefined => {
  if (RGB_REGEX.test(color)) {
    const rgb = color.match(RGB_VALUES_SEPARATOR_REGEX);
    return rgb && rgb.length === 4
      ? `#${`0${parseInt(rgb[1], 10).toString(16)}`.slice(-2)}${`0${parseInt(rgb[2], 10).toString(
          16,
        )}`.slice(-2)}${`0${parseInt(rgb[3], 10).toString(16)}`.slice(-2)}`
      : '';
  }

  if (SHORT_HEX_REGEX.test(color)) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    return `#${color.replace('#', '').replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b;
    })}`;
  }

  if (HEX_REGEX.test(color)) {
    return `#${color.replace('#', '')}`;
  }

  if (HSL_REGEX.test(color)) {
    const hsl = color.match(/\d+/g);
    return hsl && hsl.length === 3 ? hslToHex(hsl[0], hsl[1], hsl[2]) : '';
  }

  return undefined;
};
