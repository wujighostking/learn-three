export const getUrl = (url: string): string =>
  new URL('../' + url, import.meta.url).href
