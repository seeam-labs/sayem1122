import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const chunkPaths = Array.from({ length: 7 }, (_, index) =>
  `.coffee-point-runtime/chunk-${String(index).padStart(2, '0')}`,
);

const encoded = chunkPaths.map((path) => readFileSync(path, 'utf8').trim()).join('');
const archive = Buffer.from(encoded, 'base64');
const digest = createHash('sha256').update(archive).digest('hex');
const expected = 'eee7a8cf569a9b7db387ff028ff0834de171d45560c8fc40a66b05609673015d';

if (digest !== expected) {
  throw new Error(`Coffee Point source checksum mismatch: ${digest}`);
}

const archivePath = '/tmp/coffee-point-runtime.tar.xz';
writeFileSync(archivePath, archive);
execFileSync('tar', ['-xJf', archivePath, '-C', process.cwd()], { stdio: 'inherit' });
execFileSync('npm', ['install', '--no-audit', '--no-fund'], { stdio: 'inherit' });
execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
