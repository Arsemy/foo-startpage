insertQuote(getQuotation('/random'));


async function insertQuote(quotation) {
  const { content, author } = await quotation;
  document.querySelector('.card__text').textContent = addQuotes(content);
  document.querySelector('.card__author').textContent = addHyphen(author);
};


async function getQuotation(route) {
  const response = await fetch(`https://api.quotable.io${route}`);
  return await response.json();
}


function addQuotes(quotation) {
  return `“${quotation}”`
}


function addHyphen(author) {
  return `— ${author}`
}
