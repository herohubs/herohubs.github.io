// Shared by the build, which prepares the searchable text of each card, and by the browser,
// which normalizes the query, so both sides always match the same way
export const normalizeSearchText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
