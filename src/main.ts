import { fetchQuote, addQuoteMark, addHyphen } from './quote.js';


(async (quotePromise: Promise<Quote[]>) => {
  const quotesData = await quotePromise;
  const quoteData = quotesData[0];

  const cardText = document.querySelector<HTMLElement>('.card__text');
  if (cardText === null) return;
  const formatedContent = addQuoteMark(quoteData.content);
  cardText.textContent = formatedContent;

  const cardAuthor = document.querySelector<HTMLAnchorElement>('.card__author');
  if (cardAuthor === null) return;
  cardAuthor.textContent = addHyphen(quoteData.author);

  const cardTextOverflowHeight = getCardTextOverflowHeight();
  if (cardTextOverflowHeight === undefined) return;

  const cardTextStyles = getComputedStyle(cardText);
  const cardTextOverflowWidth = getOverflowWidth(
    formatedContent, cardTextStyles, cardTextOverflowHeight
    );
  if (cardTextOverflowWidth === undefined) return;

  cardText.style.minWidth = cardTextOverflowWidth;

  const cardAuthorLink = createAuthorLink('wikipedia', quoteData.author);
  if (cardAuthorLink === undefined) return;
  cardAuthor.href = cardAuthorLink;
})(fetchQuote('/quotes/random'));


function rmPx(value: string): number {
  return parseInt(value, 10);
}


function getCardTextOverflowHeight() {
  const cardQuote = document.querySelector<HTMLElement>(
    '.card__quote'
  );
  if (cardQuote === null) return;

  const cardAuthor = document.querySelector<HTMLElement>('.card__author');
  if (cardAuthor === null) return;

  const authorStyles = getComputedStyle(cardAuthor);
  const quoteStyles = getComputedStyle(cardQuote);
  const quoteContentAreaHeight = getContentAreaHeight(quoteStyles);
  const textOverflowHeight =
    quoteContentAreaHeight -
    rmPx(quoteStyles.gap) -
    rmPx(authorStyles.height);

  return `${String(textOverflowHeight)}px`;
}


function getContentAreaHeight(styles: CSSStyleDeclaration): number {
  if (styles.boxSizing === 'content-box') return rmPx(styles.height);

  const {
    height, paddingTop, paddingBottom, borderTopWidth, borderBottomWidth
  } = styles;

  return (
    rmPx(height) - rmPx(paddingTop) - rmPx(paddingBottom) -
    rmPx(borderTopWidth) - rmPx(borderBottomWidth)
  )
}


function getOverflowWidth(
  text: string,
  styles: CSSStyleDeclaration,
  overflowHeight: string
  ) {
  const element = document.createElement('p');

  element.textContent = text;
  element.style.fontSize = styles.fontSize;
  element.style.fontFamily = styles.fontFamily;

  element.style.position = 'fixed';
  element.style.width = 'max-content';
  element.style.visibility = 'hidden';

  const body = document.querySelector('body');
  if (body === null) return;
  body.append(element);

  const elementStyles = getComputedStyle(element);
  let elementMaxWidth = rmPx(elementStyles.width);
  while (
    rmPx(elementStyles.height) < rmPx(overflowHeight) &&
    elementMaxWidth > 0
  )
  {
    elementMaxWidth--;
    element.style.width = `${elementMaxWidth}px`;
  }

  const overflowWidth = element.style.width;

  element.remove();

  return overflowWidth;
}


function createAuthorLink(site: string, author: string) {
  let link;
  switch (site) {
    case 'wikipedia':
      link = `https://en.wikipedia.org/wiki/${author}`
  }
  return link;
}
