export async function fetchQuote(route) {
    const response = await fetch(`https://api.quotable.io${route}`);
    return response.json();
}
export function addQuoteMark(quotation) {
    return `“${quotation}”`;
}
export function addHyphen(author) {
    return `— ${author}`;
}