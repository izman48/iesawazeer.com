// Checks the statically exported home page (out/index.html), i.e. what
// visitors get. `npm test` builds first so this never reads a stale export.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FEATURED_PROJECTS, UNI_PROJECTS } from '@/data/projects';

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
      const meta = li.match(/<span class="meta">([\s\S]*?)<\/span>/);
      const blurb = li.match(/<p>([\s\S]*?)<\/p>/);
      return {
        title: decode(title[2]),
        meta: meta && decode(meta[1]),
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

// Every word of copy the repo controls is pinned, so any edit to an intro,
// title, tag list or blurb fails until the snapshot is updated on purpose.
// Fields fetched from GitHub at build time (repo language, and the
// description when there is no local blurb) are masked: they are not in
// this repo and change without a commit.
const FROM_GITHUB = '<from GitHub>';

function introText(sectionHtml) {
  const intro = sectionHtml.match(/<p class="muted">([\s\S]*?)<\/p>/);
  assert.ok(intro, 'section has an intro line');
  return decode(intro[1].replace(/<[^>]+>/g, ''));
}

// All visible characters in a fragment, whitespace ignored, so text can be
// compared regardless of how the markup splits it.
function visibleChars(fragment) {
  return decode(fragment.replace(/<[^>]+>/g, '')).replace(/\s+/g, '');
}

function snapshotLines(heading, entries) {
  const html = section(heading);
  const rows = projectItems(html);
  assert.equal(rows.length, entries.length, `${heading}: one row per entry`);
  // The parsed parts must account for every visible character in the
  // section, so text in an extra element (a second paragraph, a new block
  // between intro and list) cannot slip past the snapshot.
  const parsed = [
    heading,
    introText(html),
    ...rows.flatMap((row) => [row.title, row.meta, row.blurb]),
  ].filter(Boolean);
  assert.equal(visibleChars(html), parsed.join('').replace(/\s+/g, ''), `${heading}: no unparsed text`);
  return [
    `## ${heading}`,
    introText(html),
    ...rows.flatMap((row, i) => {
      const fromRepo = Boolean(entries[i].repo);
      const meta = fromRepo ? FROM_GITHUB : row.meta ?? '';
      const blurb = fromRepo && !entries[i].blurb ? FROM_GITHUB : row.blurb ?? '';
      const link = row.href ? ` ${row.href}` : '';
      return [`- ${row.title} [${meta}]${link}`, `  ${blurb}`];
    }),
  ];
}

test('project sections match the copy snapshot exactly', () => {
  const actual = [
    ...snapshotLines('Projects', FEATURED_PROJECTS),
    ...snapshotLines('From my university days', UNI_PROJECTS),
  ].join('\n');
  const expected = readFileSync(
    new URL('./home-projects.snapshot.txt', import.meta.url),
    'utf8',
  ).trimEnd();
  assert.equal(actual, expected);
});
