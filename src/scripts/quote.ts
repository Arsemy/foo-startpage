export async function fetchQuote(route: string): Promise<Quote[]> {
  const response = await fetch(`https://api.quotable.io${route}`);
  return response.json();
}


export function addQuoteMark(quotation: string) {
  return `“${quotation}”`
}


export function addHyphen(author: string) {
  return `— ${author}`
}
