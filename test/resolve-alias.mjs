// Lets `node --test` import the site's TypeScript modules directly.
// Node strips the types itself; this hook only maps the tsconfig `@/` alias
// and extensionless imports to the .ts files on disk.
import { registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = pathToFileURL(fileURLToPath(new URL('..', import.meta.url)));

registerHooks({
  resolve(specifier, context, nextResolve) {
    const isAlias = specifier.startsWith('@/');
    const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
    if (!isAlias && !isRelative) return nextResolve(specifier, context);

    const base = isAlias ? root : context.parentURL;
    const url = new URL(isAlias ? specifier.slice(2) : specifier, base);
    if (!existsSync(fileURLToPath(url)) && existsSync(fileURLToPath(url) + '.ts')) {
      return nextResolve(url.href + '.ts', context);
    }
    return nextResolve(url.href, context);
  },
});
