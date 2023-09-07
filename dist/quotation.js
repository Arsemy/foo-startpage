;
export async function insertQuote(quotation) {
    const { content, author } = await quotation;
    const cardText = document.querySelector('.card__text');
    if (cardText === null)
        return;
    cardText.textContent = addQuotes(content);
    const cardAuthor = document.querySelector('.card__author');
    if (cardAuthor === null)
        return;
    cardAuthor.textContent = addHyphen(author);
}
;
export async function getQuotation(route) {
    const response = await fetch(`https://api.quotable.io${route}`);
    return await response.json();
}
function addQuotes(quotation) {
    return `“${quotation}”`;
}
function addHyphen(author) {
    return `— ${author}`;
}
