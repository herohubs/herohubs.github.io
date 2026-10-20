#!/usr/bin/env node
// Generates resized WebP copies of the images embedded in the article body, which live in public/
// and are therefore served untouched by Astro. The covers are excluded because ImageMod already
// optimizes them. The variants and the original dimensions are listed in a manifest that
// src/lib/rehype-post-images.mjs reads at render time.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { bodyImage, manifestPath, widths } from '../src/lib/rehype-post-images.mjs';

const publicRoot = fileURLToPath(new URL('../public', import.meta.url));
const sourceDir = join(publicRoot, 'images/posts');
const outputDir = join(sourceDir, 'optimized');

mkdirSync(outputDir, { recursive: true });
mkdirSync(dirname(manifestPath), { recursive: true });

const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
const manifest = {};
let generated = 0;

for (const name of readdirSync(sourceDir)) {
  const src = `/images/posts/${name}`;
  if (!bodyImage.test(src)) continue;

  const source = join(sourceDir, name);
  const sourceTime = statSync(source).mtimeMs;
  const cached = previous[src];
  const upToDate =
    cached?.sourceTime === sourceTime && cached.variants.every(({ path }) => existsSync(join(publicRoot, path)));
  if (upToDate) {
    manifest[src] = cached;
    continue;
  }

  // The extension is part of the output name because some posts keep both a .jpg and a .png
  const base = name.replace(/\.(\w+)$/, '-$1');
  const { width, height } = await sharp(source).metadata();
  // Never upscale: widths at or above the source collapse into one variant at its native width
  const variantWidths = [...new Set([...widths.filter((target) => target < width), Math.min(width, widths.at(-1))])];
  const variants = [];
  for (const variantWidth of variantWidths) {
    const path = `/images/posts/optimized/${base}-${variantWidth}.webp`;
    await sharp(source).resize({ width: variantWidth }).webp({ quality: 82 }).toFile(join(publicRoot, path));
    variants.push({ width: variantWidth, path });
    generated++;
  }
  manifest[src] = { width, height, sourceTime, variants };
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Post images optimized: ${generated} file(s) generated in public/images/posts/optimized/.`);
