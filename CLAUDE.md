# Blog post guidelines

## File structure

Each article exists in two versions with the same filename and the same frontmatter (except for the language field):

- Italian version: `src/content/posts/it/<number>.md`
- English version: `src/content/posts/en/<number>.md`

The frontmatter follows this schema:

```yaml
---
title: ''
meta_title: ''
description: ''
date: YYYY-MM-DDTHH:MM:SSZ
image: /images/posts/post-<number>.jpg
categories:
  - <category>
series: <series> # optional, see "Series" below
draft: false
---
```

## Images

Every article has a cover at `public/images/posts/post-<number>.png`, produced in Canva in a design named after the article file, `<number>.md` (the cover for article 51 is the Canva design titled `51.md`). A new cover starts from a duplicate of the latest cover of the same kind, the previous regular article for regular posts and the previous RetroTech article for the series, which keeps the coloured corner stripes. Only the title, the subtitle written as `<English category> - <short angle>` and the yellow icon shape change, while layout, palette and fonts stay untouched, and the result is exported as a 1280x720 PNG. Exports are downloaded from `export-download.canva.com`, which must be listed among the allowed domains of the cloud environment.

Every article also carries between one and three inline figures, named with consecutive letters starting from `post-<number>b.png` (then `c`, then `d`), at 2560x1440 on the same dark palette as the covers (background `#162032`, panels `#1a2540`, teal `#16a394` for the highlighted element, orange `#e8b45c` for warnings and risks, yellow `#ffbd59` for accents, body text `#c9d3e3`) and with Inter as typeface. They can be built in Canva or rendered as charts with the same palette, and any text inside them is in English, so the same file serves both language versions.

The number of figures changes from one article to the next, following what the content actually needs, and the figures must differ in form from each other and from those of the previous article, because a row of identical block diagrams makes the blog look templated. The form follows the content: bar or line charts when the article gives real figures, timelines for history, calendars for schedules, quadrant charts for trade-offs, Gantt charts for plans, flow diagrams only when there is a real sequence, and photos from Wikimedia Commons with the licence credited in the caption, as in article 61. Data is never invented: conceptual charts have no numeric axes, illustrative examples say so inside the image, and figures taken from a source name it in a footnote.

In the Markdown, each figure uses a `<figure>` block with an `<img>` whose `alt` describes the full content of the image and a one sentence `<figcaption>`, both written in the language of the file. A figure goes at the end of the section it illustrates, never before the first heading and never two in the same section, and every image is checked visually for overlapping labels before it is committed.

## Categories

The `categories` field must use one of the predefined values, and the value is language-specific: the Italian file uses the Italian label and the English file uses the corresponding English label. The two versions of the same article must always map to the same row in the table below. Do not invent new categories.

| Italian (`it/`) | English (`en/`) |
| --------------- | --------------- |
| Sviluppo        | Development     |
| Progetti        | Projects        |
| Architettura    | Architecture    |
| AI              | AI              |

## Series

A series groups articles across categories: an article keeps its natural category and may additionally belong to one series through the optional `series` field. The value is a lowercase identifier, it is the same in both language versions, and it must be one of the ids listed in `src/lib/utils/series.ts` (an unknown value fails the build). The only series today is `retrotech`, whose landing pages are `/it/retrotech` and `/en/retrotech`, with a dedicated feed at `/<lang>/retrotech/rss.xml`. Series are not shown in the main navigation.

Adding a new series takes its id in `src/lib/utils/series.ts`, its copy under `series.items` in `src/config/it/config.json` and `src/config/en/config.json`, and the two route files under `src/pages/[lang]/<id>/` modelled on the RetroTech ones.

## Writing style

**Tone and prose**

- Long, descriptive paragraphs — no isolated single sentences
- Light punctuation: commas and periods; avoid semicolons where not necessary
- No dashes as sentence separators
- No exclamation marks
- No common words capitalized mid-sentence (only proper nouns and acronyms take a capital)

**Structure**

- The first paragraph has no heading and introduces the topic
- Subsequent sections use `#####` (five hashes) with titles starting with a capital letter (sentence case: only the initial letter and any proper nouns are capitalized)
- No bullet lists in the body text: content flows as prose

**Length**

- Target: 800-1000 words of content (roughly 4-5 minutes of reading)
- Recommended maximum: 1200 words
- Check with `wc -w <file>` and subtract roughly 30 words of frontmatter

## Code

All source code and code comments must be written in English, without exception.

## Workflow for a new article or revision

1. Always develop on a dedicated branch, never on `main`
2. Always modify both versions (`it/` and `en/`) in the same commit
3. Push the branch and let the owner review before merging

## Git conventions

- Always ask the user for confirmation before running `git branch`, `git checkout -b`, `git commit`, or `git push`; never create branches, commit, or push autonomously
- Branch names must follow the pattern `<type>/<short-description>` (e.g. `feat/article-48`, `fix/frontmatter-date`); never include references to Claude, Anthropic, or AI models in branch names
- Never add a `Co-Authored-By` trailer to commits; all commits must be attributed solely to the git user configured in the repository
- Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`. Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

## LinkedIn promotion

Every published article is promoted on LinkedIn from the owner's personal profile only, with two pieces: the post itself and a first comment carrying the two article links. The HeroHubs company page is no longer used (since 2026-11-18), because company pages get far less organic reach and consulting sells a person, not a brand.

Both pieces are written in Italian only. LinkedIn truncates a post at roughly 200 characters, so a leading English block would push the hook out of reach for the largest part of the audience, and the platform already offers automatic translation to anyone who needs it. The English article keeps its own audience, which arrives from search rather than from LinkedIn, and it stays linked in the first comment.

In the post, and in the WhatsApp message as well, avoid strings of very short declarative sentences and staccato lists after a colon (`niente lock globale, test dopo l'integrazione e conflitti risolti da Claude`): the owner considers them a recognisable sign of AI-written text and rewrites them into longer sentences joined by connectives. When the owner sends back an edited version, correct only grammar, spelling and factual errors, and keep their sentence structure, connectives and rhythm.

### Personal post

**Length** — Italian only, 150-200 words in four to six short paragraphs of one to three sentences, separated by blank lines. Never a single block.

**Voice** — first person and opinionated, the way the owner writes (`ho chiesto`, `trovo`, `non sopporto`), switching to `noi` when the point concerns the whole profession. Conversational connectives (`Il fatto è che`, `A quanto pare`, `Un po' per curiosità`) and English technical words left as they are (pipeline, hook, changelog). Tie the topic to the owner's daily work when there is a real link, and never invent an anecdote or an experience: without a real episode, use opinion instead.

**Structure**

1. An opening that takes a stance or overturns the obvious reading, fully within the first 200 characters. Vary the construction from post to post: check how the previous posts opened and pick a different one, such as a list of facts, a striking figure, a question or a personal admission.
2. The body, explaining what the thing is and how it works, with concrete names and figures taken from the article and one step of the reasoning per paragraph.
3. The link mentioned in prose (`Ne ho scritto sul blog, trovate il link nel primo commento.`), never the formula `👉 link nel primo commento` and never the URL in the post itself.
4. A closing that invites replies with a full sentence rather than a bare question (`Sono curioso di sapere come lo gestite voi, ...`).

**Image** — attach the cover or one of the article figures, so the post is native and never a bare link preview.

**Hashtags** — two lowercase, subject specific tags on their own line at the bottom.

**Tone** — no exclamation marks, no dashes as separators, colons are welcome and the word after a colon is never capitalised. No engagement bait such as `se vi interessa vi giro il link` or `commentate per ricevere l'articolo`: LinkedIn demotes it and it clashes with the owner's dislike of self-promotional posts.

**Reference example**

```
Dependabot è uno di quegli strumenti che quasi tutti hanno attivato e quasi nessuno ha davvero configurato. Il risultato lo conosciamo bene: una mattina la lista delle pull request si riempie di aggiornamenti, uno per ogni libreria rimasta indietro, e da lì si finisce per approvarli in blocco oppure per ignorarli finché il contatore non diventa imbarazzante.

Il fatto è che il bot non decide nulla da solo. Applica la politica che gli diamo, e se non ne scriviamo una usa quella di default, che propone tutto, subito e separatamente.

Bastano poche righe nel dependabot.yml per cambiare il quadro, con una pianificazione settimanale e dei gruppi che raccolgono patch e minor in un'unica revisione, lasciando a parte solo i salti di versione maggiore, gli unici che meritano davvero una lettura del changelog.

L'opzione che trovo più interessante è il cooldown, che aspetta qualche giorno prima di proporre una release appena pubblicata. Dopo il worm Shai-Hulud, che nel settembre 2025 ha compromesso centinaia di pacchetti npm, rallentare è diventato una forma di difesa, perché le prime ore di vita di una release sono le più pericolose, mentre le correzioni di sicurezza continuano ad arrivare subito.

Ne ho scritto sul blog, trovate il link nel primo commento. Sono curioso di sapere come lo gestite voi, se lo lasciate lavorare con la configurazione di default o se avete già scritto la vostra politica.

#dependabot #supplychainsecurity
```

### First comment

Only the two article links, Italian first, each prefixed with its flag and nothing else, published right after the post so that the first readers already find them:

```
🇮🇹 https://herohubs.it/it/posts/<number>
🇬🇧 https://herohubs.it/en/posts/<number>
```

The URL slug is the article number, with no trailing slash.

## WhatsApp promotion

The same article is also shared on WhatsApp, in Italian and in a single message, more direct than the LinkedIn post because the reader is already a contact and needs no persuading.

**Length** — around 100 words in total, split into three short blocks separated by blank lines, as in the LinkedIn post.

**Structure**

1. One opening line announcing the article, closed by 👇 (`Nuovo articolo sul blog 👇`)
2. A paragraph of 60-80 words that opens with the same idea as the LinkedIn post's opening, then explains in plain terms what the thing is and how it works, with no figures and no jargon left unexplained
3. One line naming what else the reader will find inside, phrased as a reason to open it (`Nell'articolo c'è come l'ho configurato io e un paio di casi d'uso reali.`)
4. The Italian link alone on the last line

**Formatting** — only the Italian link, never the English one. No hashtags, no flags, no CTA formula. Attach the cover image `post-<number>.png` and put the whole text in the caption, so the preview does not depend on the link being scraped.

**Tone** — same punctuation rules as everywhere else: no exclamation marks, no dashes as separators, colons welcome, no capital after a colon.

**Reference example**

```
Nuovo articolo sul blog 👇

Paperclip non è l'ennesimo modello più potente, è un organigramma di agenti AI. Metti un CEO al vertice, sotto uno scrittore, un ingegnere, un editor, un designer, e il lavoro si delega lungo le linee di riporto come in un'azienda vera. Ogni agente ha un budget mensile e si ferma da solo quando lo esaurisce, e nei passaggi delicati aspetta la tua conferma prima di andare avanti.

Nell'articolo c'è come l'ho configurato io e un paio di casi d'uso reali, dalla gelateria al campo da paddle.

https://herohubs.it/it/posts/54
```

## Style reference

Articles 45 and 46 are the up-to-date references for tone, density, and structure:

- `src/content/posts/it/45.md`
- `src/content/posts/it/46.md`
