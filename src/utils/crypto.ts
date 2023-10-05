// import { createHash } from 'node:crypto';

import { createHash } from 'crypto';

function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex');
}
