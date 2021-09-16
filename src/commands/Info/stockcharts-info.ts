import got from 'got';
import * as cheerio from 'cheerio';

export interface Earnings {
  NextEarningDate: string;
  earningsTime: string;
  LastEarningDate: string;
}

export interface Fundamentals {
  date: string;
  DividendExDate: string;
  EPS: string;
  Website: string;
  RevenuePerShare: string;
  NumberOfEmployees: string;
  SalesOrRevenue: string;
  DividendRate: string;
  MarketCapitalizationIssuerLevel: string;
  Address2: string;
  PriceToFreeCashFlow: string;
  SharesHeldByInstitutions: string;
  Address1: string;
  City: string;
  PriceToCashFlow: string;
  BusinessDescription: string;
  Float: string;
  BookValue: string;
  earnings: Earnings;
  PERatio: string;
  State: string;
  PriceToBook: string;
  Beta60Month: string;
  SharesOutstanding: string;
  FloatAsPercentOfSharesOutstanding: string;
  PEGRatio: string;
}

export interface SctrhistEntity {
  date: string;
  value: number;
}
export interface TickerInfo {
  fundamentals: Fundamentals;
  symbol: string;
  latestTrade: string;
  country: number;
  smavol: number;
  yearrange: string;
  EPS: number;
  rsi: string;
  industry: string;
  sectorSCTR: number;
  high: string;
  allTimeHigh: string;
  low: string;
  yield: string;
  options: number;
  dividend: string;
  sector: string;
  close: string;
  perf: string;
  atr: string;
  industryName: string;
  marketCap: number;
  sma200: string;
  sma50: string;
  lastSCTR: number;
  SCTR: number;
  sctrhist?: (SctrhistEntity)[] | null;
  outstandingShares: number;
  volume: string;
  lastClose: string;
  adx: string;
  PE: number;
  ema20: string;
  universe: string;
  name: string;
  exchange: number;
  open: string;
}

export const getSymbolInfo = async (ticker: string): Promise<TickerInfo> => got(`https://stockcharts.com/j-sum/sum?cmd=symsum&symbol=${encodeURIComponent(ticker)}`).json();

export const getCompanyInfo = async (ticker: string): Promise<string> => {
  const result = await got(`https://finviz.com/quote.ashx?t=${encodeURIComponent(ticker)}`);
  const $ = cheerio.load(result.body);
  return $('body > div:nth-child(8) > div > table:nth-child(3) > tbody > tr.table-light3-row > td').text();
};
