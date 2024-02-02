import crypto from "crypto";
const salt = "paraplane";

export function getHash(password) {
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}
