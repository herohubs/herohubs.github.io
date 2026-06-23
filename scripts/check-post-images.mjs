#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const postsRoot = join(repoRoot, 'src/content/posts');
const publicRoot = join(repoRoot, 'public');

const imageMarkdown = /!\[[^\]]*\]\((\/[^)\s]+)\)/g;
const imageFrontmatter = /^image:\s*(\/\S+)/m;

const missing = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!full.endsWith('.md')) continue;
    const source = readFileSync(full, 'utf8');
    const refs = new Set();
    const fm = source.match(imageFrontmatter);
    if (fm) refs.add(fm[1]);
    for (const match of source.matchAll(imageMarkdown)) refs.add(match[1]);
    for (const ref of refs) {
      const target = join(publicRoot, ref);
      if (!existsSync(target)) {
        missing.push({ post: full.replace(repoRoot + '/', ''), ref });
      }
    }
  }
}

walk(postsRoot);

if (missing.length === 0) {
  console.log('All post image references resolve to files under public/.');
  process.exit(0);
}

console.error(`Missing image files referenced by posts (${missing.length}):`);
for (const { post, ref } of missing) {
  console.error(`  - ${post} -> ${ref}`);
}
process.exit(1);
