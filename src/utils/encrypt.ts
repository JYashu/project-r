// Define a function to generate a salt
const generateSalt = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return String.fromCharCode.apply(null, Array.from(array));
};

// Define a function to derive a key from a password and a salt
const deriveKeyFromPassword = async (password: string, salt: string) => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256,
  );
  const derivedKey = await crypto.subtle.importKey('raw', derivedBits, { name: 'AES-CBC' }, false, [
    'encrypt',
    'decrypt',
  ]);
  return derivedKey;
};

// Define a function to decrypt an encrypted string
export const decryptString = async (encryptedStr: string, secretKey: string) => {
  const parts = encryptedStr.split(':');
  const salt = parts[0];
  const iv = new Uint8Array(parts[1].split('').map((c) => c.charCodeAt(0)));
  const encryptedData = Uint8Array.from(atob(parts[2]), (c) => c.charCodeAt(0));
  const derivedKey = await deriveKeyFromPassword(secretKey, salt);
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv },
    derivedKey,
    encryptedData,
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
};

// Define a function to encrypt a string
export const encryptString = async (str: string, secretKey: string): Promise<string> => {
  const salt = generateSalt();
  const derivedKey = await deriveKeyFromPassword(secretKey, salt);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    derivedKey,
    data,
  );
  const saltAndIv = `${salt}:${String.fromCharCode.apply(null, Array.from(iv))}`;
  const encryptedStr = btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(encryptedData))),
  );
  try {
    await decryptString(`${saltAndIv}:${encryptedStr}`, secretKey);
  } catch (e) {
    return encryptString(str, secretKey);
  }
  return `${saltAndIv}:${encryptedStr}`;
};
