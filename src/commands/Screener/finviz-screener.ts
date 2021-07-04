import got from 'got';
import * as cheerio from 'cheerio';

// based on code from here https://github.com/meerkat-citronella/node-finviz-screener/blob/main/index.js

const TICKERS_SELECTOR = '#screener-content#screener-content > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2)';
const PAGINATION_SELECTOR = '.screener_pagination';
const FINVIZ_URL_PREPEND = 'https://finviz.com/';

const timer = async (ms: number) => new Promise<void>((resolve, _reject) => {
  setTimeout(() => resolve(), ms);
});

/**
 * Get a list of tickers that pass a Finviz screen
 * @param {string} finvizScreenerUrl - the url of the Finviz screener to search for
 * @returns {string[]|string} array of tickers that pass the Finviz screen, or an error message
 */
export const getFinvizScreen = async (
  finvizScreenerUrl: string, __tickers: string[] = null,
): Promise<string[]> => {
  // typeguard
  try {
    // we are checking for an exception
    // eslint-disable-next-line no-unused-expressions
    /(\/\/finviz.com\/screener.ashx)/.exec(finvizScreenerUrl)[0];
  } catch (err) {
    throw Error('ERROR: invalid finviz screener URL. Please pass a valid link to a finviz screener.');
  }

  const res = await got(finvizScreenerUrl);
  const text = await res.body;
  const $ = cheerio.load(text);

  const syms = $(TICKERS_SELECTOR)
    .map(function (i, el) {
      if (i !== 0) return $(this).text(); // first row is header row ("Ticker")
    })
    .get();

  __tickers = __tickers ? __tickers.concat(syms) : syms;

  const pagination = $(PAGINATION_SELECTOR).children(); // all the other pages to go through
  const next = pagination.filter((_i, _el) => {
    const text = $(this).text();
    return text === "next";
  });

  if (next.length > 0) {
    // if there is a 'next' page, go to it
    await timer(7); // too quick a pace on the requests causes the server to return a blank page with only "too many requests" on it
    return getFinvizScreen(FINVIZ_URL_PREPEND + next.attr("href"), __tickers);
  } else {
    return __tickers;
  }
};
