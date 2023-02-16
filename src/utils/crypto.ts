import { createCipheriv, scryptSync } from 'crypto';

const algorithm = 'aes-256-ctr';
const password = '0123456789ABCDEF';
const key = scryptSync(password, 'salt', 32);
const iv = Buffer.alloc(16, 0);

/**
 * 加密方法
 * @param text
 * @returns {string}
 */
export const Encrypt = (text: string): string => {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

/**
 * 解密方法
 * @param text
 * @returns {string}
 */
export const Decrypt = (text: string): string => {
  const decipher = createCipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
