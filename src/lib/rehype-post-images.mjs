// Points the images embedded in the article body to the WebP copies produced by
// scripts/optimize-post-images.mjs, adding srcset, intrinsic dimensions and lazy loading.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

export const widths = [800, 1280, 1920];
export const bodyImage = /^\/images\/posts\/post-\d+[a-z]+\.(png|jpe?g)$/;
export const manifestPath = fileURLToPath(
  new URL('../../node_modules/.cache/post-images/manifest.json', import.meta.url),
);

const sizes = '(min-width: 1140px) 1068px, 100vw';

let manifest = {};
let manifestTime = 0;

// Reloads the manifest only when the optimize script has rewritten it
function loadManifest() {
  if (!existsSync(manifestPath)) return {};
  const time = statSync(manifestPath).mtimeMs;
  if (time !== manifestTime) {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    manifestTime = time;
  }
  return manifest;
}

export default function rehypePostImages() {
  return (tree, file) => {
    const entries = loadManifest();
    visit(tree, 'element', (node) => {
      const src = node.properties?.src;
      if (node.tagName !== 'img' || !bodyImage.test(src ?? '')) return;

      const entry = entries[src];
      if (!entry) {
        console.warn(
          `[rehype-post-images] ${src} has no optimized variants, run scripts/optimize-post-images.mjs (${file.path})`,
        );
        return;
      }

      node.properties = {
        ...node.properties,
        src: entry.variants.at(-1).path,
        srcset: entry.variants.map(({ width, path }) => `${path} ${width}w`).join(', '),
        sizes,
        width: entry.width,
        height: entry.height,
        loading: 'lazy',
        decoding: 'async',
      };
    });
  };
}
