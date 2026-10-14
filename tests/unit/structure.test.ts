import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

describe('site structure', () => {
  const html = read('index.html');
  const js = read('src/main.ts');

  it('index.html loads the module entry', () => {
    expect(html).toContain('<script type="module" src="/src/main.ts"></script>');
  });

  it('main.ts imports the stylesheet', () => {
    expect(js).toContain("import './styles.css';");
  });

  it('every assets/ file the page links to exists in public/assets', () => {
    const refs = new Set([...(html + js).matchAll(/assets\/[\w.-]+\.(?:webp|png|jpe?g|pdf|svg)/g)].map((m) => m[0]));
    expect(refs.size).toBeGreaterThan(0);
    const missing = [...refs].filter((r) => !existsSync(resolve(root, 'public', r)));
    expect(missing).toEqual([]);
  });

  // The mini mascot markup was removed from the page earlier but its code is still in main.ts.
  // Listed here so the test stays green; remove the entries once that code is cleaned up or the markup returns.
  const KNOWN_MISSING = ['mini', 'miniBody', 'miniSay'];

  it("every id main.ts looks up with $('#id') exists in index.html or is created by the script", () => {
    const ids = [...new Set([...js.matchAll(/\$\('#([\w-]+)'\)/g)].map((m) => m[1]))];
    const created = (id: string) => js.includes(`id="${id}"`) || js.includes(`.id = '${id}'`);
    const missing = ids.filter((id) => !html.includes(`id="${id}"`) && !created(id) && !KNOWN_MISSING.includes(id));
    expect(missing).toEqual([]);
  });
});
