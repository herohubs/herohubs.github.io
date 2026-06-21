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
- Subsequent sections use `#####` (five hashes) with lowercase titles
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

## Style reference

Articles 45 and 46 are the up-to-date references for tone, density, and structure:

- `src/content/posts/it/45.md`
- `src/content/posts/it/46.md`
