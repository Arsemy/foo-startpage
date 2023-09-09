export async function getQuotation(route: string): Promise<Quote> {
  const response = await fetch(`https://api.quotable.io${route}`);
  return await response.json();
}


export function addQuotes(quotation: string) {
  return `“${quotation}”`
}


export function addHyphen(author: string) {
  return `— ${author}`
}
