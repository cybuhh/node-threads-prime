import path from 'path';
import { fileURLToPath } from 'url';

export function getFilename(metaUrl) {
  return fileURLToPath(metaUrl);
}

export function getDirname(metaUrl) {
  return path.dirname(getFilename(metaUrl));
}
