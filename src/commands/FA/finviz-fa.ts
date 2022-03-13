import got from 'got';
import * as cheerio from 'cheerio';

export interface fa_num {
  pe: string;
  epsttm: string;
  fpe: string;
  epsnextq: string;
  ps: string;
  divi: string;
  pfcf: string;
  diviperc: string;
  salesqoq: string;
  epsqoq: string;
  erdate: string;
}

export const getCompanyFA = async (ticker: string): Promise<fa_num> => {
	
  const result = await got(`https://finviz.com/quote.ashx?t=${encodeURIComponent(ticker)}`);
  const $ = cheerio.load(result.body);
  
  var fa_num = {
	pe: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(1) > td:nth-child(4)').text(),
	epsttm: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(1) > td:nth-child(6)').text(),
	
	fpe: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(2) > td:nth-child(4)').text(),
	
	epsnextq: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(3) > td:nth-child(6)').text(),
	
	ps: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(4) > td:nth-child(4)').text(),
	
	divi: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(7) > td:nth-child(2)').text(),
	pfcf: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(7) > td:nth-child(4)').text(),
	
	diviperc: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(8) > td:nth-child(2)').text(),
	salesqoq: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(9) > td:nth-child(6)').text(),
	epsqoq: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(10) > td:nth-child(6)').text(),
	erdate: $('body > div:nth-child(9) > div > table.snapshot-table2 > tbody > tr:nth-child(11) > td:nth-child(6)').text(),
  }
  return fa_num
};
