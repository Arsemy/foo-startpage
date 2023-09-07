interface Quote {
  _id?: string,
  content: string,
  author: string,
  authorSlug?: string,
  length?: number,
  tags?: string[],
};


export async function insertQuote(quotation: Promise<Quote>) {
  const { content, author } = await quotation;

  const cardText = document.querySelector<HTMLDivElement>('.card__text');
  if (cardText === null) return;
  cardText.textContent = addQuotes(content);

  const cardAuthor = document.querySelector<HTMLDivElement>('.card__author');
  if (cardAuthor === null) return;
  cardAuthor.textContent = addHyphen(author);
};


export async function getQuotation(route: string): Promise<Quote> {
  const response = await fetch(`https://api.quotable.io${route}`);
  return await response.json();
}


function addQuotes(quotation: string) {
  return `“${quotation}”`
}


function addHyphen(author: string) {
  return `— ${author}`
}
