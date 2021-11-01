import got from 'got';
import * as cheerio from 'cheerio';

interface FinVizTable {
    release: string;
    actual: string;
    date: string;
    expected: string;
    for: string;
    impact: number;
    prior: string;
    time: string;
}

export const getFinvizEventsTable = async (
): Promise<FinVizTable[]> => {
  const result = await got('https://www.finviz.com');
  const $ = cheerio.load(result.body);
  const scrapedData: FinVizTable[] = [];
  const tableHeaders: string[] = [];
  
  $('#homepage_bottom > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr').each((index, element) => {
    if (index === 0) {
      const ths = $(element).find('td');
      $(ths).each((_i, tdElement) => {
        tableHeaders.push(
          $(tdElement)
            .text()
            .toLowerCase()
            .replace(/\s/g, ''),
        );
      });
      return true;
    }

    const tds = $(element).find('td');
    const tableRow: any = {};
    $(tds).each((i, tdElement) => {
      if (tableHeaders[i] === 'impact') {
        const img = $(tdElement).html();
        if (img.startsWith('<img src="gfx/calendar/impact_1.gif"')) {
          tableRow[tableHeaders[i]] = 1;
        } else if (img.startsWith('<img src="gfx/calendar/impact_2.gif"')) {
          tableRow[tableHeaders[i]] = 2;
        } else if (img.startsWith('<img src="gfx/calendar/impact_3.gif"')) {
          tableRow[tableHeaders[i]] = 3;
        } else {
          tableRow[tableHeaders[i]] = 0;
        }
      } else {
        tableRow[tableHeaders[i]] = $(tdElement).text();
      }
    });
    scrapedData.push(tableRow);
    return true;
  });

  return scrapedData;
};
