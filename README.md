# HeroHubs — Tailored Digital Innovation

Official source code for [herohubs.it](https://herohubs.it/), the freelance website of **HeroHubs** — a software consultancy offering custom development, cloud infrastructure, and technical consulting for companies and startups.

## Tech Stack

| Layer              | Technology                                                                  |
| ------------------ | --------------------------------------------------------------------------- |
| Framework          | [Astro 5](https://astro.build/)                                             |
| UI                 | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Content            | MDX + Markdown                                                              |
| Styling            | Montserrat font, custom CSS modules                                         |
| Code highlighting  | [Shiki](https://shiki.style/) (One Dark Pro theme)                          |
| Image optimization | [Sharp](https://sharp.pixelplumbing.com/)                                   |
| Deployment         | GitHub Pages (CI via GitHub Actions) + Netlify                              |
| Package manager    | Yarn 1.x                                                                    |

## Project Structure

```
herohubs.github.io/
├── public/              # Static assets (images, robots.txt, .htaccess)
├── src/
│   ├── config/          # Site-wide and per-language configuration (JSON)
│   │   ├── en/          # English: menu, homepage content, i18n strings, site config
│   │   ├── it/          # Italian: same structure as en/
│   │   ├── main-config.json  # Global settings (URL, pagination, languages)
│   │   ├── social.json       # Social links (LinkedIn, email)
│   │   └── theme.json        # Colors and typography
│   ├── content/
│   │   ├── pages/       # Static pages per language (about, services, portfolio…)
│   │   └── posts/       # Blog posts per language (en/ and it/)
│   ├── layouts/
│   │   ├── components/  # Reusable UI components (Post, Pagination, Social…)
│   │   │   └── home/    # Homepage sections (Services, Why, How, Blog, Contacts…)
│   │   ├── helpers/     # Utility components (DynamicIcon, Disqus)
│   │   ├── partials/    # Header, Footer, PageHeader
│   │   └── shortcodes/  # MDX shortcodes (Button, Accordion, Notice, Tabs, Video)
│   ├── pages/
│   │   └── [lang]/      # Locale-prefixed routes (/en/*, /it/*)
│   ├── lib/             # Content parsers and utility functions
│   ├── styles/          # CSS files (base, buttons, navigation, transitions…)
│   └── tailwind-plugin/ # Custom Tailwind plugins (grid, theme)
├── .github/workflows/   # CI/CD: build and deploy to GitHub Pages on push to main
├── astro.config.mjs     # Astro configuration
├── netlify.toml         # Netlify build settings (alternative deployment)
└── lefthook.yml         # Pre-commit hook: Prettier auto-format
```

## Pages

| Route                      | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `/`                        | Redirects to the default language (`/en`)                       |
| `/en` / `/it`              | Homepage with hero, services, how-it-works, customers, contacts |
| `/[lang]/about`            | About HeroHubs                                                  |
| `/[lang]/services`         | Services offered                                                |
| `/[lang]/portfolio`        | Portfolio of past projects                                      |
| `/[lang]/contacts`         | Contact form and details                                        |
| `/[lang]/blog`             | Blog listing with pagination                                    |
| `/[lang]/posts/[slug]`     | Individual blog post                                            |
| `/[lang]/categories/[cat]` | Posts filtered by category                                      |
| `/[lang]/ui-kit`           | Component showcase                                              |

## i18n

The site supports two languages: **English** (`en`) and **Italian** (`it`).
All content lives under `src/content/pages/{lang}/` and `src/content/posts/{lang}/`.
Configuration and UI strings are managed in `src/config/{lang}/`.
The default language is `en` (set in `main-config.json`).

## Local Development

**Prerequisites:** Node.js LTS (≥ 20) and Yarn 1.x.

```bash
# Install dependencies
yarn install

# Start the dev server (http://localhost:4321)
yarn dev
```

The dev server watches for file changes and live-reloads the browser.

## Production Build

```bash
yarn build     # Outputs to dist/
yarn preview   # Serves the production build locally
```

## Code Formatting

[Prettier](https://prettier.io/) runs automatically on every commit via [Lefthook](https://lefthook.dev/).
To format manually:

```bash
yarn format
```

## Deployment

**GitHub Pages** is the primary deployment target.
Pushing to `main` triggers the workflow at `.github/workflows/deploy.yml`, which:

1. Installs Node 20 and runs `npm ci`
2. Builds the site with `npm run build`
3. Copies the `CNAME` file into `dist/`
4. Publishes `dist/` to the `gh-pages` branch via [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages)

A **Netlify** configuration (`netlify.toml`) is also present as an alternative deployment option (`yarn build`, Node 20, publish dir `dist/`).

## Configuration Reference

| File                            | Purpose                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| `src/config/main-config.json`   | Site URL, pagination, languages, favicon, analytics          |
| `src/config/{lang}/config.json` | Site title, profile bio, metadata, cookie banner strings     |
| `src/config/{lang}/home.json`   | Homepage section content (hero blocks, services, customers…) |
| `src/config/{lang}/menu.json`   | Navigation links                                             |
| `src/config/{lang}/i18n.json`   | UI label translations                                        |
| `src/config/social.json`        | Social network links and visibility flags                    |
| `src/config/theme.json`         | Primary/secondary colors, font family and size               |

## Contact

- Website: [herohubs.it](https://herohubs.it/)
- Email: [info@herohubs.it](mailto:info@herohubs.it)
- LinkedIn: [linkedin.com/company/herohubs](https://www.linkedin.com/company/herohubs)

## License

Released under the [MIT](./LICENSE) license.
