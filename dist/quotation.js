export async function getQuotation(route) {
    const response = await fetch(`https://api.quotable.io${route}`);
    return await response.json();
}
export function addQuotes(quotation) {
    return `“${quotation}”`;
}
export function addHyphen(author) {
    return `— ${author}`;
}
