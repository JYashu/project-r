export const URL_REGEX = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i', // fragment locator
);

export const RGB_REGEX =
  /^rgb\(\s*(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])\s*\)$/;

export const SHORT_HEX_REGEX = /^#?[0-9a-fA-F]{3}$/;

export const HEX_REGEX = /^#?[0-9a-fA-F]{6}$/;

export const HSL_REGEX =
  /^hsl\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*((0|[1-9]\d?)%|100%)\s*,\s*((0|[1-9]\d?)%|100%)\s*\)$/;

export const RGB_VALUES_SEPARATOR_REGEX =
  /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
