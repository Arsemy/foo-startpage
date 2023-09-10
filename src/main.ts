import { fetchQuote, addQuoteMark, addHyphen } from './quote.js';


(async (quotePromise: Promise<Quote[]>) => {
  const quotesData = await quotePromise;
  const quoteData = quotesData[0];

  const cardText = document.querySelector<HTMLDivElement>('.card__text');
  if (cardText === null) return;
  const formatedContent = addQuoteMark(quoteData.content);
  cardText.textContent = formatedContent;

  const cardAuthor = document.querySelector<HTMLDivElement>('.card__author');
  if (cardAuthor === null) return;
  cardAuthor.textContent = addHyphen(quoteData.author);

  const cardTextOverflowHeight = getCardTextOverflowHeight();
  if (cardTextOverflowHeight === undefined) return;

  const cardTextStyles = getComputedStyle(cardText);
  const cardTextOverflowWidth = getOverflowWidth(
    formatedContent, cardTextStyles.fontSize, cardTextOverflowHeight
    );
  if (cardTextOverflowWidth === undefined) return;

  cardText.style.minWidth = cardTextOverflowWidth;
})(fetchQuote('/quotes/random'));


function rmPx(value: string): number {
  return parseInt(value);
}


function getCardTextOverflowHeight() {
  const cardQuotation = document.querySelector<HTMLDivElement>(
    '.card__quote'
  );
  if (cardQuotation === null) return;

  const cardAuthor = document.querySelector<HTMLDivElement>('.card__author');
  if (cardAuthor === null) return;

  const authorStyles = getComputedStyle(cardAuthor);
  const quoteStyles = getComputedStyle(cardQuotation);
  const quoteContentAreaHeight = getContentAreaHeight(quoteStyles);
  const textMaxHeight =
    quoteContentAreaHeight -
    rmPx(quoteStyles.gap) -
    rmPx(authorStyles.height);

  return `${String(textMaxHeight)}px`;
}


function getContentAreaHeight(styles: CSSStyleDeclaration): number {
  const { height, paddingTop, paddingBottom } = styles;

  return rmPx(height) - rmPx(paddingTop) - rmPx(paddingBottom);
}


function getOverflowWidth(
  text: string,
  fontSize: string,
  overflowHeight: string
  ) {
  const element = document.createElement('p');

  element.textContent = text;
  element.style.fontSize = fontSize;

  element.style.position = 'fixed';
  element.style.width = 'max-content';
  element.style.visibility = 'hidden';

  const body = document.querySelector('body');
  if (body === null) return;
  body.append(element);

  const elementStyles = getComputedStyle(element);
  let elementMaxWidth = rmPx(elementStyles.width);
  while (rmPx(elementStyles.height) < rmPx(overflowHeight)) {
    elementMaxWidth--;
    element.style.width = `${elementMaxWidth}px`;
  }

  const overflowWidth = element.style.width;

  element.remove();

  return overflowWidth;
}
