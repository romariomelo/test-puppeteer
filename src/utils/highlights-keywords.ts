import { keywordsList } from './keywords-list';

const regex = new RegExp(keywordsList.join('|'), 'ig');

export function hasKeywords(texto: string) {
  return regex.test(texto);
}

export const highlightsKeywords = (texto: string): string => {
  return texto.replace(
    regex,
    (palavra) =>
      // `<table bgcolor="#ffff00" style="background:#ffff00;"><tr><td>${palavra.toUpperCase()}</td></tr></table>`,
      `<mark><u> ${palavra.toUpperCase()}</u></mark>`,
  );
};
