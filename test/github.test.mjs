// The site is built by Netlify with no guarantee GitHub is reachable.
// Every project must still render (name, link, blurb) when the API fails.
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getProjects } from '@/lib/github';
import { FEATURED_PROJECTS, UNI_PROJECTS } from '@/data/projects';

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const ALL = [...FEATURED_PROJECTS, ...UNI_PROJECTS];

function assertEveryProjectRenders(projects) {
  assert.equal(projects.length, ALL.length);
  projects.forEach((p, i) => {
    const entry = ALL[i];
    assert.ok(p.name, `entry ${i} has a name`);
    assert.equal(p.name, entry.repo ?? entry.title, `entry ${i} keeps its order`);
    if (entry.repo || entry.url) assert.ok(p.url, `${p.name} has a link`);
    assert.equal(p.description, entry.blurb ?? '', `${p.name} keeps its blurb`);
  });
}

test('network error: every project falls back to local data', async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    throw new TypeError('fetch failed');
  };
  assertEveryProjectRenders(await getProjects(ALL));
  // Precondition: the stub was actually hit, so the fallback path ran.
  assert.equal(calls, ALL.filter((p) => p.repo).length);
});

test('API error status: every project falls back to local data', async () => {
  globalThis.fetch = async () => new Response('rate limited', { status: 403 });
  assertEveryProjectRenders(await getProjects(ALL));
});

test('repo fallback links to the GitHub repo', async () => {
  globalThis.fetch = async () => {
    throw new TypeError('fetch failed');
  };
  const [p] = await getProjects([{ repo: 'finance-tracker' }]);
  assert.equal(p.url, 'https://github.com/izman48/finance-tracker');
});
