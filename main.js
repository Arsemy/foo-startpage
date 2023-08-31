function rmPx(value) {
  return parseInt(value);
}

function getContentAreaHeight(styles) {
  const { height, paddingTop, paddingBottom } = styles;
  return rmPx(height) - rmPx(paddingTop) - rmPx(paddingBottom);
}

const card = document.querySelector('.card');
const cardStyles = getComputedStyle(card);

const cardQuote = document.querySelector('.card__quote');
const cardQuoteStyles = getComputedStyle(cardQuote);
const cardQuoteContentAreaHeight = getContentAreaHeight(cardQuoteStyles);

const cardAuthor = document.querySelector('.card__author');
const cardAuthorStyles = getComputedStyle(cardAuthor);

const cardTextOverflowHeight =
  cardQuoteContentAreaHeight -
  rmPx(cardAuthorStyles.height) -
  rmPx(cardQuoteStyles.gap);

const cardText = document.querySelector('.card__text');
const cardTextStyles = getComputedStyle(cardText);

window.addEventListener('resize', () => {
  if (
    cardTextOverflowHeight <= rmPx(cardTextStyles.height) +
    rmPx(cardTextStyles.fontSize) +
    rmPx(cardTextStyles.lineHeight)
  ) {
    card.style.minWidth = cardStyles.width;
  }
})
