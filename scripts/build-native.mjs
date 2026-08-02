import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'www');
const excluded = new Set([
  '.git', '.github', 'node_modules', 'www', 'ios', 'android', 'scripts',
  'package.json', 'package-lock.json', 'capacitor.config.ts', 'NATIVE_APP_SETUP.md'
]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const name of await readdir(root)) {
  if (excluded.has(name)) continue;
  const source = path.join(root, name);
  const info = await stat(source);
  if (info.isDirectory() || /\.(html|css|js|json|webmanifest|svg|png|jpg|jpeg|webp|ico|mp3|wav|m4a)$/i.test(name)) {
    await cp(source, path.join(out, name), { recursive: true });
  }
}

console.log('NEET NOTE native web bundle created in www/');
