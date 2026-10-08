// Checks the statically exported home page (out/index.html), i.e. what
// visitors get. `npm test` builds first so this never reads a stale export.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../out/index.html', import.meta.url), 'utf8');

const FEATURED_ORDER = [
  'finance-tracker',
  'jnwtours.com',
  'llm-control-plane',
  'llm-rl-playground',
  'jnwrentacar.com',
];

const UNI_ORDER = [
  '2d-fighting-game-rl-ai-training-tool-dissertation',
  'Derivative trade system for Deutsche Bank',
  'The Warwick Esports website',
  'TourneyBot',
  'Verticality — NSE Game Jam 2021',
  'Tetris',
  'JS-Challenge',
  'Iris dataset classification',
  'Image preprocessing with OpenCV',
  'iesawazeer.com',
  'Traffic-roundabout-visualisation',
  'Pathfinding robot in a maze',
];

function decode(s) {
  return s
    .replace(/<!-- -->/g, '')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

// The section between an <h2> and the next <h2>.
function section(heading) {
  const start = html.indexOf(`<h2>${heading}</h2>`);
  assert.notEqual(start, -1, `heading "${heading}" exists`);
  const end = html.indexOf('<h2>', start + 1);
  return html.slice(start, end === -1 ? undefined : end);
}

function projectItems(sectionHtml) {
  const list = sectionHtml.match(/<ol[^>]*class="project-list"[^>]*>([\s\S]*?)<\/ol>/);
  assert.ok(list, 'projects are rendered as <ol class="project-list">');
  return [...list[1].matchAll(/<li class="project">([\s\S]*?)<\/li>/g)].map(
    ([, li]) => {
      const title = li.match(/<(a|strong)[^>]*>([\s\S]*?)<\/\1>/);
      const href = li.match(/<a href="([^"]*)"/);
      const blurb = li.match(/<p>([\s\S]*?)<\/p>/);
      return {
        title: decode(title[2]),
        href: href && decode(href[1]),
        blurb: blurb && decode(blurb[1]),
      };
    },
  );
}

const featured = () => projectItems(section('Projects'));
const uni = () => projectItems(section('From my university days'));

test('featured projects: current work pinned, then newest to oldest', () => {
  assert.deepEqual(featured().map((p) => p.title), FEATURED_ORDER);
});

test('university projects: newest first, maze robot last', () => {
  assert.deepEqual(uni().map((p) => p.title), UNI_ORDER);
});

test('jnwtours.com links to the live site with the agreed blurb', () => {
  const row = featured().find((p) => p.title === 'jnwtours.com');
  assert.equal(row.href, 'https://jnwtours.com/');
  assert.equal(
    row.blurb,
    'A site for a Sri Lankan tour and transfer company: airport transfers, self-drive rental and private tours. Static pages built with Astro, and a Cloudflare Worker that handles the enquiry forms.',
  );
});

test('only the jnwtours.com blurb lists the tour services', () => {
  const rentacar = featured().find((p) => p.title === 'jnwrentacar.com');
  assert.equal(
    rentacar.blurb,
    'Self-drive car rental in Sri Lanka: a page for each vehicle with its daily rate, and the full rental terms.',
  );
  assert.match(rentacar.blurb, /self-drive car rental/i);
  assert.doesNotMatch(rentacar.blurb, /airport transfers|tours/i);
});

// Owner decision: order only, no years in the project meta.
test('no project meta starts with a year', () => {
  const metas = [section('Projects'), section('From my university days')]
    .flatMap((h) => [...h.matchAll(/<span class="meta">([\s\S]*?)<\/span>/g)])
    .map(([, m]) => decode(m));
  assert.ok(metas.includes('Astro, Cloudflare Workers, Live site'), 'precondition: metas found');
  assert.deepEqual(metas.filter((m) => /^(19|20)\d\d\b/.test(m)), []);
});
