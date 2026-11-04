# HeroHubs

Source code of [herohubs.it](https://herohubs.it/), the blog of Ranieri Vannozzi on software development, architecture and artificial intelligence, written in Italian and English from real projects. HeroHubs is also the brand under which he works as a freelance tech lead and software architect.

## Features

- **Bilingual articles:** every article exists in Italian and English with the same file name, and an article that is a draft in one language is treated as a draft in both.
- **Categories:** Sviluppo / Development, Progetti / Projects, Architettura / Architecture and AI, with localized URLs (`/it/categorie/...`, `/en/categories/...`).
- **Series:** articles can also belong to a series that runs across categories. The only series today is RetroTech, with its own landing page, badge and feed.
- **Feeds and sitemap:** an RSS feed per language and per series, plus a generated sitemap.
- **Search:** client-side article search on the blog page.
- **Home page:** a randomly featured article, which shows its series badge when it has one, and the latest articles.
- **Images:** covers go through the Astro image pipeline, and the images embedded in an article are resized to WebP at build time by `scripts/optimize-post-images.mjs`.
- **Privacy:** Montserrat is self-hosted and Google Analytics loads only after the visitor accepts cookies.

## Tech stack

| Layer             | Technology                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Framework         | [Astro 5](https://astro.build/)                                                               |
| UI                | [Tailwind CSS 4](https://tailwindcss.com/), [React 19](https://react.dev/) for MDX shortcodes |
| Content           | Markdown and MDX, with `rehype-raw` and `rehype-external-links`                               |
| Code highlighting | [Shiki](https://shiki.style/), One Dark Pro theme                                             |
| Images            | [Sharp](https://sharp.pixelplumbing.com/)                                                     |
| Typography        | Montserrat, self-hosted from `public/fonts/`                                                  |
| Hosting           | GitHub Pages, deployed by GitHub Actions                                                      |

## Project structure

```
herohubs.github.io/
├── public/                  # Static assets: fonts, images, robots.txt, .htaccess
├── scripts/                 # Image optimization and image reference checks
├── src/
│   ├── config/
│   │   ├── it/ and en/      # Per-language site config, home page, menu and UI strings
│   │   ├── main-config.json # Site URL, languages, pagination, favicon, footer
│   │   └── theme.json       # Colors and typography
│   ├── content/
│   │   ├── pages/{it,en}/   # About, privacy, cookie and terms pages
│   │   └── posts/{it,en}/   # Articles, one file per article and language
│   ├── layouts/             # Page layouts, components, partials and MDX shortcodes
│   ├── lib/                 # Content parser, rehype plugin and utilities (series, languages, feeds)
│   ├── pages/[lang]/        # Locale-prefixed routes
│   ├── redirect.config.ts   # Redirects from legacy URLs
│   └── styles/              # Base styles, buttons, navigation, transitions
├── .github/workflows/       # CI on pull requests, deploy on push to main
└── lefthook.yml             # Git hooks: Prettier and Conventional Commits
```

## Routes

| Route                                                                             | Description                                                     |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `/`                                                                               | Redirects to `/it` or `/en` according to the browser language   |
| `/[lang]`                                                                         | Home page                                                       |
| `/[lang]/blog`                                                                    | Article listing with search and pagination (`/[lang]/page/[n]`) |
| `/[lang]/posts/[n]`                                                               | Single article, identified by its number                        |
| `/it/categorie/[c]`, `/en/categories/[c]`                                         | Articles of a category                                          |
| `/[lang]/retrotech`, `/retrotech`                                                 | RetroTech series page, and a short link in the browser language |
| `/[lang]/rss.xml`, `/[lang]/retrotech/rss.xml`                                    | Feeds per language and for the series                           |
| `/[lang]/about`                                                                   | About the author                                                |
| `/[lang]/privacy-policy`, `/[lang]/cookie-policy`, `/[lang]/terms-and-conditions` | Legal pages                                                     |

The default language is English, set in `main-config.json`.

## Writing an article

Each article is a pair of files with the same number, `src/content/posts/it/<n>.md` and `src/content/posts/en/<n>.md`, always changed together in the same commit:

```yaml
---
title: ''
meta_title: ''
description: ''
date: YYYY-MM-DDTHH:MM:SSZ
image: /images/posts/post-<n>.png
categories:
  - <category>
series: retrotech # optional
draft: true
---
```

The category value is language-specific and must be one of the four listed above. A series id must be declared in `src/lib/utils/series.ts`, otherwise the build fails. The cover lives at `public/images/posts/post-<n>.png` and the images embedded in the article next to it.

## Local development

**Prerequisites:** Node.js 20, the version used by CI and deploy, and npm.

```bash
npm ci            # install the exact dependencies from package-lock.json
npm run dev       # optimize article images, then start the dev server on http://localhost:4321
npm run build     # optimize article images, then build into dist/
npm run preview   # serve the production build locally
npm run check     # Astro type and template checks
npm run format    # format the repository with Prettier
```

Drafts are visible in the dev server and excluded from the production build.

## Quality checks

- **Pre-commit:** [Lefthook](https://lefthook.dev/) formats the repository with [Prettier](https://prettier.io/) and stages the result.
- **Commit messages:** a commit-msg hook enforces [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`).
- **Pull requests:** the CI workflow checks formatting, verifies that every image referenced by an article exists and builds the site.

## Deployment

Changes reach `main` through pull requests, merged with squash. Every push to `main` runs `.github/workflows/deploy.yml`, which installs dependencies with `npm ci`, builds the site, copies `CNAME` into `dist/` and publishes it to the `gh-pages` branch, served by GitHub Pages.

## Configuration reference

| File                            | Purpose                                                            |
| ------------------------------- | ------------------------------------------------------------------ |
| `src/config/main-config.json`   | Site URL, languages, default language, pagination, favicon, footer |
| `src/config/{lang}/config.json` | Site title, metadata, series copy, cookie banner strings           |
| `src/config/{lang}/home.json`   | Home page sections                                                 |
| `src/config/{lang}/menu.json`   | Navigation links                                                   |
| `src/config/{lang}/i18n.json`   | UI label translations                                              |
| `src/config/theme.json`         | Colors, font family and size                                       |
| `src/lib/utils/series.ts`       | Declared series ids                                                |
| `src/redirect.config.ts`        | Redirects from legacy URLs                                         |

## Contact

- Website: [herohubs.it](https://herohubs.it/)
- Email: [info@herohubs.it](mailto:info@herohubs.it)
- Author profile: [ranierivannozzi.com](https://ranierivannozzi.com)

## License

The source code is released under the [MIT](./LICENSE) license, inherited from the [Hydrogen Astro](https://github.com/statichunt/hydrogen-astro) theme by Statichunt on which the site is based.

The articles, images and other editorial content are not covered by that license and remain © Ranieri Vannozzi, all rights reserved.
