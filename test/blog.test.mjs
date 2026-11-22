// Checks the statically exported blog (out/blog/...), i.e. what visitors get.
// `npm test` builds first so this never reads a stale export.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getAllPosts } from '@/lib/posts';

const out = (path) => fileURLToPath(new URL(`../out${path}`, import.meta.url));
const page = (path) => readFileSync(out(`${path}index.html`), 'utf8');
const article = (slug) => {
  const html = page(`/blog/${slug}/`);
  const match = html.match(/<article>([\s\S]*?)<\/article>/);
  assert.ok(match, `${slug}: the post is rendered inside <article>`);
  return match[1];
};
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const images = (html) => html.match(/<img\b[^>]*>/g) ?? [];

const posts = getAllPosts();

test('the blog index links every post, newest first', () => {
  const links = [...page('/blog/').matchAll(/<a href="\/blog\/([^"/]+)\/"/g)].map(([, slug]) => slug);
  assert.ok(posts.length > 0, 'precondition: there are posts');
  assert.deepEqual(links, posts.map((p) => p.slug));
  assert.deepEqual(
    posts.map((p) => p.date),
    posts.map((p) => p.date).sort().reverse(),
  );
});

test('every image in a post is a local file that exists, with alt text', () => {
  let seen = 0;
  for (const { slug } of posts) {
    for (const img of images(article(slug))) {
      seen += 1;
      const src = attr(img, 'src');
      assert.ok(src?.startsWith('/'), `${slug}: ${src} is served from this site`);
      assert.ok(existsSync(out(src)), `${slug}: ${src} is in the export`);
      assert.ok(attr(img, 'alt')?.trim(), `${slug}: ${src} has alt text`);
    }
  }
  assert.ok(seen > 0, 'precondition: at least one post has an image');
});

test('every figure in a post has one image and a caption', () => {
  let seen = 0;
  for (const { slug } of posts) {
    for (const [, figure] of article(slug).matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/g)) {
      seen += 1;
      assert.equal(images(figure).length, 1, `${slug}: a figure holds one image`);
      const caption = figure.match(/<figcaption>([\s\S]*?)<\/figcaption>/);
      assert.ok(caption?.[1].replace(/<[^>]+>/g, '').trim(), `${slug}: a figure has a caption`);
    }
  }
  assert.ok(seen > 0, 'precondition: at least one post has a figure');
});

test('the health.nilu.app post shows the app screens', () => {
  const html = article('health-nilu-app');
  assert.match(html, /<h1>How I use health\.nilu\.app, the calorie tracker I built<\/h1>/);
  const sources = images(html).map((img) => attr(img, 'src'));
  for (const name of ['dashboard.webp', 'mobile.webp', 'history.webp', 'goal.webp', 'changes.webp']) {
    assert.ok(sources.includes(`/images/health-nilu-app/${name}`), `shows ${name}`);
  }
});

// Owner decision: the post is for general readers, so no picture is left
// in public/ that the post does not show.
test('every picture in the health.nilu.app folder is used by the post', () => {
  const sources = images(article('health-nilu-app')).map((img) => attr(img, 'src'));
  const folder = new URL('../public/images/health-nilu-app/', import.meta.url);
  for (const file of readdirSync(folder)) {
    assert.ok(sources.includes(`/images/health-nilu-app/${file}`), `${file} is shown`);
  }
});

// Owner preference for new writing. The first post predates it.
test('the health.nilu.app post has no em dashes', () => {
  const raw = readFileSync(new URL('../content/posts/health-nilu-app.mdx', import.meta.url), 'utf8');
  assert.doesNotMatch(raw, /—/);
});
