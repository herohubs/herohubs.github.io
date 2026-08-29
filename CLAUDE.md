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
draft: false
---
```

## Cover images (Canva)

The cover image lives at `/images/posts/post-<number>.<ext>` and is produced in Canva. The Canva design must be named after the article file, `<number>.md` (for example, the cover for article 51 is the Canva design titled `51.md`). To create a new cover, duplicate the previous article's design and replace only the text layers, keeping the shared layout, palette, and fonts, then export the result as `post-<number>.png` under `public/images/posts/`.

## Categories

The `categories` field must use one of the predefined values, and the value is language-specific: the Italian file uses the Italian label and the English file uses the corresponding English label. The two versions of the same article must always map to the same row in the table below. Do not invent new categories.

| Italian (`it/`) | English (`en/`) |
| --------------- | --------------- |
| Sviluppo        | Development     |
| Progetti        | Projects        |
| Architettura    | Architecture    |
| AI              | AI              |

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

Every published article is promoted on LinkedIn with three coordinated pieces: an Italian post on the company page (scheduled for 7:30 AM), a first comment carrying the two article links, and a relaunch from the owner's personal profile at 1:30 PM.

All three pieces are written in Italian only. LinkedIn truncates a post at roughly 200 characters, so a leading English block would push the hook out of reach for the largest part of the audience, and the platform already offers automatic translation to anyone who needs it. The English article keeps its own audience, which arrives from search rather than from LinkedIn, and it stays linked in the first comment.

### Company page post

**Length** — one single paragraph in Italian, 110-130 words. No internal line breaks, no lists, no sub-headings.

**Structure** — the paragraph follows a fixed narrative arc:

1. Opening that frames the event and states the obvious reading of it (`Quando Sakana AI ha presentato Fugu, molti lo hanno letto come l'ennesimo modello che batte i predecessori sui benchmark.`)
2. A short pivot sentence that overturns that reading (`È qualcosa di più curioso.`)
3. The body, explaining what the thing actually is and how it works, with concrete names and figures taken from the article
4. A closing lesson introduced by a colon, generalising beyond the specific product (`il valore si sposta dal cervello più potente al sistema che collega quelli disponibili.`)
5. The CTA at the end of the same paragraph, never on its own line

The opening and the pivot must both fit within the first 200 characters, because that is all LinkedIn shows before the reader has to expand the post.

**Formatting** — a single block with no flag prefix. The CTA is `👉 link nel primo commento`. Two lowercase, subject specific hashtags close the post at the very bottom (for example `#sakanaai #fugu`); no generic `#ai` here.

**Tone** — no exclamation marks, no dashes as separators, colons are welcome and the word after a colon is never capitalised.

**Reference example**

```
Quando Sakana AI ha presentato Fugu, molti lo hanno letto come l'ennesimo modello che batte i predecessori sui benchmark. È qualcosa di più curioso. Fugu non è affatto un modello grande: è un minuscolo orchestratore da circa sette miliardi di parametri, addestrato non a rispondere ma a instradare ogni richiesta al modello più adatto. Dato un insieme di modelli chiusi e aperti, da Claude Opus a Gemini e GPT, delega, verifica e sintetizza un'unica risposta, e così facendo supera Opus 4.8 avvicinandosi ai modelli di frontiera più recenti. La lezione non riguarda la potenza bruta ma il coordinamento: il valore si sposta dal cervello più potente al sistema che collega quelli disponibili. 👉 link nel primo commento

#sakanaai #fugu
```

### First comment

Only the two article links, Italian first, each prefixed with its flag and nothing else:

```
🇮🇹 https://herohubs.it/it/posts/<number>
🇬🇧 https://herohubs.it/en/posts/<number>
```

The URL slug is the article number, with no trailing slash.

### Personal relaunch

**Length** — Italian only, one single block of 150-180 words. No flags, no link, no CTA, no line breaks.

**Structure** — punchier and more opinionated than the company post, and it re-angles the article rather than condensing the company post, picking details the company post left out:

1. A two beat antithetical opening, one short sentence stating what the news is not and one even shorter stating what it is (`La notizia AI della settimana non è un modello più potente. È uno più piccolo.`)
2. The body, alternating long explanatory sentences with very short declarative ones that set the rhythm (`Il suo mestiere è orchestrare.`)
3. One concrete, almost anecdotal figure that the company post did not use (`Una pagina web può uscire per il 60% da un modello e per il 40% da un altro.`)
4. The pivot on what actually matters, introduced by a colon (`Cambia la domanda che conta: non chi costruisce il cervello più potente, ma chi coordina meglio quelli che già esistono.`)
5. A closing antithesis echoing the opening (`Non è una gara di potenza, è una gara di connessione.`)
6. A final sentence widening the frame beyond the product itself (`E il Giappone si è appena seduto al tavolo dei grandi senza addestrare un modello suo.`)

**Tone** — declarative and editorial rather than first person, no `io` needed. Same punctuation rules as everywhere else: no exclamation marks, no dashes as separators, colons welcome, no capital after a colon.

**Hashtags** — two lowercase subject specific tags on their own line at the bottom, overlapping with but not identical to the company post's pair. No generic `#ai`.

**Reference example**

```
La notizia AI della settimana non è un modello più potente. È uno più piccolo. Sakana AI ha rilasciato Fugu e i benchmark lo danno sopra Opus 4.8, vicino ai modelli di frontiera più recenti, ma sotto il cofano non c'è un gigante da centinaia di miliardi di parametri: ce n'è uno da sette, addestrato a non rispondere. Il suo mestiere è orchestrare. Riceve la richiesta, sceglie tra Claude Opus, Gemini, GPT e altri il modello giusto per ogni parte, delega, incrocia i risultati e ricompone un'unica risposta, sfruttando la parte migliore di ciascuno. Una pagina web può uscire per il 60% da un modello e per il 40% da un altro. Cambia la domanda che conta: non chi costruisce il cervello più potente, ma chi coordina meglio quelli che già esistono. Non è una gara di potenza, è una gara di connessione. E il Giappone si è appena seduto al tavolo dei grandi senza addestrare un modello suo.

#fugu #orchestration
```

## WhatsApp promotion

The same article is also shared on WhatsApp, in Italian and in a single message, more direct than either LinkedIn piece because the reader is already a contact and needs no persuading.

**Length** — around 100 words in total, split into three short blocks separated by blank lines. Line breaks are allowed here, unlike on LinkedIn.

**Structure**

1. One opening line announcing the article, closed by 👇 (`Nuovo articolo sul blog 👇`)
2. A paragraph of 60-80 words that opens with the same antithesis used in the personal relaunch, then explains in plain terms what the thing is and how it works, with no figures and no jargon left unexplained
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
